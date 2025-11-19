import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { TaskList } from '../components/tasks/TaskList';
import { TaskBoard } from '../components/tasks/TaskBoard'; // ← NUEVO
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { useTasks } from '../hooks/useTasks';
import { type TaskStatus, type TaskPriority } from '../types';
import { 
  PlusIcon, 
  ArrowDownTrayIcon,
  Squares2X2Icon,    // ← NUEVO (vista cuadrícula)
  ViewColumnsIcon    // ← NUEVO (vista tablero)
} from '@heroicons/react/24/outline';
import { exportTasksToCSV } from '../utils/exportCSV';
import toast from 'react-hot-toast';

export const Tasks: React.FC = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [priority, setPriority] = useState<TaskPriority | ''>('');
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'board'>('grid'); // ← NUEVO
  const navigate = useNavigate();

  const { 
    tasks, 
    isLoading, 
    totalPages,
    fetchTasks,
    deleteTask,
    updateTaskStatus 
  } = useTasks({ search, status: status || undefined, priority: priority || undefined, page, limit: 100 }); // ← Aumenté limit para el board

  const handleExport = () => {
    try {
      exportTasksToCSV(tasks);
      toast.success('Tareas exportadas exitosamente');
    } catch (error) {
      toast.error('Error al exportar tareas');
    }
  };

  const handleTaskMove = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success('Estado actualizado');
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tareas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona todas tus tareas
          </p>
        </div>
        <div className="flex space-x-2">
          {/* Botones de vista */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Squares2X2Icon className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === 'board' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('board')}
              className="rounded-none"
            >
              <ViewColumnsIcon className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="secondary"
            onClick={handleExport}
            disabled={tasks.length === 0}
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      <TaskFilters
        search={search}
        status={status}
        priority={priority}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      {/* Vista condicional: Grid o Board */}
      {viewMode === 'grid' ? (
        <>
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onDelete={deleteTask}
            onUpdate={fetchTasks}
            onStatusChange={updateTaskStatus}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
            </div>
          )}
        </>
      ) : (
        <TaskBoard
          tasks={tasks}
          onTaskMove={handleTaskMove}
          onTaskClick={(task) => navigate(`/tasks/${task.id}`)}
        />
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nueva Tarea"
        size="lg"
      >
        <TaskForm
          onSuccess={() => {
            setShowCreateModal(false);
            fetchTasks();
          }}
        />
      </Modal>
    </div>
  );
};
