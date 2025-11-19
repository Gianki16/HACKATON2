import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { ProjectForm } from '../projects/ProjectForm';
import { TaskForm } from '../tasks/TaskForm';
import { PlusIcon, FolderPlusIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

export const QuickActions: React.FC = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Acciones Rápidas
        </h3>
        <div className="space-y-3">
          <Button
            fullWidth
            onClick={() => setShowProjectModal(true)}
            className="justify-start"
          >
            <FolderPlusIcon className="h-5 w-5 mr-2" />
            Nuevo Proyecto
          </Button>
          
          <Button
            fullWidth
            variant="secondary"
            onClick={() => setShowTaskModal(true)}
            className="justify-start"
          >
            <DocumentPlusIcon className="h-5 w-5 mr-2" />
            Nueva Tarea
          </Button>

          <Button
            fullWidth
            variant="ghost"
            onClick={() => navigate('/team')}
            className="justify-start"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Ver Equipo
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title="Crear Nuevo Proyecto"
        size="lg"
      >
        <ProjectForm onSuccess={() => setShowProjectModal(false)} />
      </Modal>

      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title="Crear Nueva Tarea"
        size="lg"
      >
        <TaskForm onSuccess={() => setShowTaskModal(false)} />
      </Modal>
    </>
  );
};
