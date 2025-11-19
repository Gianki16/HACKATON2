import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { TaskForm } from './TaskForm';
import { Task } from '../../types';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  UserCircleIcon,
  FolderIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: () => void;
  onStatusChange: (id: string, status: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onDelete,
  onUpdate,
  onStatusChange 
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      toast.error('Error al eliminar tarea');
    } finally {
      setIsDeleting(false);
    }
  };

  const statusVariant = {
    TODO: 'default' as const,
    IN_PROGRESS: 'info' as const,
    COMPLETED: 'success' as const,
  };

  const priorityVariant = {
    LOW: 'default' as const,
    MEDIUM: 'warning' as const,
    HIGH: 'warning' as const,
    URGENT: 'danger' as const,
  };

  return (
    <>
      <Card hover className="group">
        <div className="flex items-start justify-between mb-3">
          <h3 
            className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 flex-1"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            {task.title}
          </h3>
          <Badge variant={statusVariant[task.status]} size="sm">
            {task.status.replace('_', ' ')}
          </Badge>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">Prioridad:</span>
            <Badge variant={priorityVariant[task.priority]} size="sm">
              {task.priority}
            </Badge>
          </div>

          {task.project && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FolderIcon className="h-4 w-4 mr-1" />
              {task.project.name}
            </div>
          )}

          {task.assignedUser && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <UserCircleIcon className="h-4 w-4 mr-1" />
              {task.assignedUser.name}
            </div>
          )}

          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Vence: {format(new Date(task.dueDate), "d 'de' MMMM", { locale: es })}
            </div>
          )}
        </div>

        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/tasks/${task.id}`)}
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
        title="Editar Tarea"
        size="lg"
      >
        <TaskForm 
          task={task}
          onSuccess={() => {
            setShowEditModal(false);
            onUpdate();
          }}
        />
      </Modal>
    </>
  );
};
