import React from 'react';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Project } from '../../types';

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  isLoading,
  onDelete,
  onUpdate,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No se encontraron proyectos
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
