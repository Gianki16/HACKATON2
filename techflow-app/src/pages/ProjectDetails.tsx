import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { ProjectForm } from '../components/projects/ProjectForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { type Project } from '../types';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import { useTasks } from '../hooks/useTasks';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const { 
    tasks, 
    isLoading: tasksLoading,
    fetchTasks,
    deleteTask,
    updateTaskStatus 
  } = useTasks({ projectId: id });

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await projectService.getProject(id);
        setProject(data);
      } catch (error: any) {
        toast.error('Error al cargar proyecto');
        navigate('/projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!project || !window.confirm('¿Estás seguro de eliminar este proyecto?')) return;
    
    try {
      await projectService.deleteProject(project.id);
      toast.success('Proyecto eliminado exitosamente');
      navigate('/projects');
    } catch (error: any) {
      toast.error('Error al eliminar proyecto');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) return null;

  const statusVariant = {
    ACTIVE: 'success' as const,
    COMPLETED: 'info' as const,
    ON_HOLD: 'warning' as const,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/projects')}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Creado el {format(new Date(project.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
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

      <Card>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Estado
            </span>
            <div className="mt-1">
              <Badge variant={statusVariant[project.status]}>
                {project.status}
              </Badge>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Descripción
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">
              {project.description || 'Sin descripción'}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tareas del Proyecto
        </h2>
        <Button onClick={() => setShowTaskModal(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        isLoading={tasksLoading}
        onDelete={deleteTask}
        onUpdate={fetchTasks}
        onStatusChange={updateTaskStatus}
      />

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
            window.location.reload();
          }}
        />
      </Modal>

      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title="Nueva Tarea"
        size="lg"
      >
        <TaskForm
          defaultProjectId={project.id}
          onSuccess={() => {
            setShowTaskModal(false);
            fetchTasks();
          }}
        />
      </Modal>
    </div>
  );
};
