import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { ProjectForm } from './ProjectForm';
import { type Project } from '../../types';
import { PROJECT_STATUS_COLORS } from '../../utils/constants';
import { 
  PencilIcon, 
  TrashIcon, 
  FolderOpenIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onDelete,
  onUpdate 
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return;
    
    setIsDeleting(true);
    try {
      await onDelete(project.id);
    } catch (error) {
      toast.error('Error al eliminar proyecto');
    } finally {
      setIsDeleting(false);
    }
  };

  const statusVariant = {
    ACTIVE: 'success' as const,
    COMPLETED: 'info' as const,
    ON_HOLD: 'warning' as const,
  };

  return (
    <>
      <Card hover className="group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FolderOpenIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h3 
              className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-primary-600"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              {project.name}
            </h3>
          </div>
          <Badge variant={statusVariant[project.status]}>
            {project.status}
          </Badge>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <CalendarIcon className="h-4 w-4 mr-1" />
          Creado {format(new Date(project.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
        </div>

        {project.tasks && project.tasks.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">{project.tasks.length}</span> tareas
            </p>
          </div>
        )}

        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/projects/${project.id}`)}
            className="flex-1"
          >
            Ver Detalles
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditModal(true)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Proyecto"
        size="lg"
      >
        <ProjectForm 
          project={project}
          onSuccess={() => {
            setShowEditModal(false);
            onUpdate();
          }}
        />
      </Modal>
    </>
  );
};
