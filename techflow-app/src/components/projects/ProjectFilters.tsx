import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { ProjectStatus } from '../../types';
import { PROJECT_STATUS } from '../../utils/constants';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ProjectFiltersProps {
  search: string;
  status: ProjectStatus | '';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | '') => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    ...Object.entries(PROJECT_STATUS).map(([key, value]) => ({
      value,
      label: key.replace('_', ' '),
    })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar proyectos..."
        />
        <MagnifyingGlassIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as ProjectStatus | '')}
        options={statusOptions}
      />
    </div>
  );
};
