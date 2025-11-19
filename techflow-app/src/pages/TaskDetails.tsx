import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { TaskForm } from '../components/tasks/TaskForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Task } from '../types';
import { taskService } from '../services/taskService';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  UserCircleIcon,
  FolderIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

export const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await taskService.getTask(id);
        setTask(data);
      } catch (error: any) {
        toast.error('Error al cargar tarea');
        navigate('/tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!task || !window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    
    try {
      await taskService.deleteTask(task.id);
      toast.success('Tarea eliminada exitosamente');
      navigate('/tasks');
    } catch (error: any) {
      toast.error('Error al eliminar tarea');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!task) return null;

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tasks')}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {task.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Creado el {format(new Date(task.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(true)}
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Descripción
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {task.description || 'Sin descripción'}
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detalles
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estado
                </span>
                <div className="mt-1">
                  <Badge variant={statusVariant[task.status]}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Prioridad
                </span>
                <div className="mt-1">
                  <Badge variant={priorityVariant[task.priority]}>
                    {task.priority}
                  </Badge>
                </div>
              </div>

              {task.project && (
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <FolderIcon className="h-4 w-4 mr-1" />
                    Proyecto
                  </span>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {task.project.name}
                  </p>
                </div>
              )}

              {task.assignedUser && (
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <UserCircleIcon className="h-4 w-4 mr-1" />
                    Asignado a
                  </span>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {task.assignedUser.name}
                  </p>
                </div>
              )}

              {task.dueDate && (
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Fecha de vencimiento
                  </span>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {format(new Date(task.dueDate), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

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
            window.location.reload();
          }}
        />
      </Modal>
    </div>
  );
};
