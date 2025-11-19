import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { TaskStatus, TaskPriority } from '../../types';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TaskFiltersProps {
  search: string;
  status: TaskStatus | '';
  priority: TaskPriority | '';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatus | '') => void;
  onPriorityChange: (value: TaskPriority | '') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    ...Object.entries(TASK_STATUS).map(([key, value]) => ({
      value,
      label: key.replace('_', ' '),
    })),
  ];

  const priorityOptions = [
    { value: '', label: 'Todas las prioridades' },
    ...Object.entries(TASK_PRIORITY).map(([key, value]) => ({
      value,
      label: key,
    })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar tareas..."
        />
        <MagnifyingGlassIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as TaskStatus | '')}
        options={statusOptions}
      />

      <Select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as TaskPriority | '')}
        options={priorityOptions}
      />
    </div>
  );
};
