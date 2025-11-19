import React, { useState, useEffect } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Task, TaskStatus, TaskPriority, Project, TeamMember } from '../../types';
import { taskService } from '../../services/taskService';
import { projectService } from '../../services/projectService';
import { teamService } from '../../services/teamService';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import toast from 'react-hot-toast';

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
  defaultProjectId?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess, defaultProjectId }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'TODO' as TaskStatus,
    priority: task?.priority || 'MEDIUM' as TaskPriority,
    projectId: task?.projectId || defaultProjectId || '',
    assignedTo: task?.assignedTo || '',
    dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, membersData] = await Promise.all([
          projectService.getProjects({ limit: 100 }),
          teamService.getMembers(),
        ]);
        setProjects(projectsData.data);
        setMembers(membersData);
      } catch (error) {
        toast.error('Error al cargar datos');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('El título de la tarea es requerido');
      return;
    }

    if (!formData.projectId) {
      toast.error('Debes seleccionar un proyecto');
      return;
    }

    setIsLoading(true);
    try {
      const dataToSend = {
        ...formData,
        assignedTo: formData.assignedTo || undefined,
        dueDate: formData.dueDate || undefined,
      };

      if (task) {
        await taskService.updateTask(task.id, dataToSend);
        toast.success('Tarea actualizada exitosamente');
      } else {
        await taskService.createTask(dataToSend);
        toast.success('Tarea creada exitosamente');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar tarea');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = Object.entries(TASK_STATUS).map(([key, value]) => ({
    value,
    label: key.replace('_', ' '),
  }));

  const priorityOptions = Object.entries(TASK_PRIORITY).map(([key, value]) => ({
    value,
    label: key,
  }));

  const projectOptions = [
    { value: '', label: 'Selecciona un proyecto' },
    ...projects.map(p => ({ value: p.id, label: p.name })),
  ];

  const memberOptions = [
    { value: '', label: 'Sin asignar' },
    ...members.map(m => ({ value: m.id, label: m.name })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título de la Tarea *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Ej: Implementar autenticación"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe la tarea..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Estado *"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
          options={statusOptions}
        />

        <Select
          label="Prioridad *"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
          options={priorityOptions}
        />
      </div>

      <Select
        label="Proyecto *"
        value={formData.projectId}
        onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
        options={projectOptions}
        required
      />

      <Select
        label="Asignar a"
        value={formData.assignedTo}
        onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
        options={memberOptions}
      />

      <Input
        label="Fecha de vencimiento"
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
      />

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          {task ? 'Actualizar' : 'Crear'} Tarea
        </Button>
      </div>
    </form>
  );
};
