import React from 'react';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onUpdate: () => void;
  onStatusChange: (id: string, status: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onDelete,
  onUpdate,
  onStatusChange,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No se encontraron tareas
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
