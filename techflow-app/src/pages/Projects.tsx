import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ProjectList } from '../components/projects/ProjectList';
import { ProjectForm } from '../components/projects/ProjectForm';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { useProjects } from '../hooks/useProjects';
import { ProjectStatus } from '../types';
import { PlusIcon } from '@heroicons/react/24/outline';

export const Projects: React.FC = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProjectStatus | ''>('');
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { 
    projects, 
    isLoading, 
    totalPages,
    fetchProjects,
    deleteProject 
  } = useProjects({ search, status, page, limit: 12 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Proyectos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona todos tus proyectos
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <ProjectFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <ProjectList
        projects={projects}
        isLoading={isLoading}
        onDelete={deleteProject}
        onUpdate={fetchProjects}
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

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nuevo Proyecto"
        size="lg"
      >
        <ProjectForm
          onSuccess={() => {
            setShowCreateModal(false);
            fetchProjects();
          }}
        />
      </Modal>
    </div>
  );
};
