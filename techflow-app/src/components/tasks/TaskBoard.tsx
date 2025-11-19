import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Task, TaskStatus } from '../../types';
import { TASK_STATUS, PRIORITY_COLORS } from '../../utils/constants';
import { 
  CalendarIcon, 
  UserCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import clsx from 'clsx';

interface TaskBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
}

interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

const columns: Column[] = [
  { id: 'TODO', title: 'Por Hacer', color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'IN_PROGRESS', title: 'En Progreso', color: 'bg-blue-100 dark:bg-blue-900' },
  { id: 'COMPLETED', title: 'Completado', color: 'bg-green-100 dark:bg-green-900' },
];

// Componente de tarjeta de tarea arrastrable
const SortableTaskCard: React.FC<{ task: Task; onClick: () => void }> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityVariant = {
    LOW: 'default' as const,
    MEDIUM: 'warning' as const,
    HIGH: 'warning' as const,
    URGENT: 'danger' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-move"
    >
      <Card 
        hover 
        className={clsx(
          'transition-all duration-200',
          isDragging && 'ring-2 ring-primary-500 shadow-lg'
        )}
        onClick={onClick}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
              {task.title}
            </h4>
            <Badge variant={priorityVariant[task.priority]} size="sm">
              {task.priority}
            </Badge>
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-col space-y-1 text-xs text-gray-500 dark:text-gray-400">
            {task.assignedUser && (
              <div className="flex items-center">
                <UserCircleIcon className="h-3 w-3 mr-1" />
                <span className="truncate">{task.assignedUser.name}</span>
              </div>
            )}

            {task.dueDate && (
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <span>{format(new Date(task.dueDate), "d MMM", { locale: es })}</span>
                {new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED' && (
                  <span className="ml-1 text-red-500">• Vencida</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Componente de columna
const BoardColumn: React.FC<{
  column: Column;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}> = ({ column, tasks, onTaskClick }) => {
  return (
    <div className="flex-1 min-w-[280px] max-w-[350px]">
      <div className={clsx('rounded-lg p-4', column.color)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h3>
          <Badge variant="default" size="sm">
            {tasks.length}
          </Badge>
        </div>

        <div className="space-y-3">
          <SortableContext
            items={tasks.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                No hay tareas
              </div>
            ) : (
              tasks.map((task) => (
                <SortableTaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick(task)}
                />
              ))
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

// Componente principal del tablero
export const TaskBoard: React.FC<TaskBoardProps> = ({ 
  tasks, 
  onTaskMove, 
  onTaskClick 
}) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasksByStatus, setTasksByStatus] = useState<Record<TaskStatus, Task[]>>({
    TODO: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requiere mover 8px antes de activar drag
      },
    })
  );

  // Organizar tareas por estado
  useEffect(() => {
    const organized: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      COMPLETED: [],
    };

    tasks.forEach((task) => {
      if (organized[task.status]) {
        organized[task.status].push(task);
      }
    });

    setTasksByStatus(organized);
  }, [tasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    // Si se soltó en una columna diferente
    if (TASK_STATUS[newStatus as keyof typeof TASK_STATUS]) {
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        onTaskMove(taskId, newStatus);
      }
    }

    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <ClockIcon className="h-5 w-5" />
        <span>Arrastra las tareas para cambiar su estado</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <SortableContext
              key={column.id}
              items={[column.id]}
              strategy={verticalListSortingStrategy}
            >
              <div id={column.id}>
                <BoardColumn
                  column={column}
                  tasks={tasksByStatus[column.id]}
                  onTaskClick={onTaskClick}
                />
              </div>
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <Card className="w-[280px] rotate-3 shadow-2xl">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {activeTask.title}
                </h4>
                <Badge variant="warning" size="sm">
                  {activeTask.priority}
                </Badge>
              </div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
