import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { type Project, type ProjectStatus } from '../../types';
import { projectService } from '../../services/projectService';
import { PROJECT_STATUS } from '../../utils/constants';
import toast from 'react-hot-toast';

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'ACTIVE' as ProjectStatus,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('El nombre del proyecto es requerido');
      return;
    }

    setIsLoading(true);
    try {
      if (project) {
        await projectService.updateProject(project.id, formData);
        toast.success('Proyecto actualizado exitosamente');
      } else {
        await projectService.createProject(formData);
        toast.success('Proyecto creado exitosamente');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar proyecto');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = Object.entries(PROJECT_STATUS).map(([key, value]) => ({
    value,
    label: key.replace('_', ' '),
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre del Proyecto *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Ej: Rediseño de la página web"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe el proyecto..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
        />
      </div>

      <Select
        label="Estado"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
        options={statusOptions}
      />

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          {project ? 'Actualizar' : 'Crear'} Proyecto
        </Button>
      </div>
    </form>
  );
};
