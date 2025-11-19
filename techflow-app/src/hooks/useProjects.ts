import { useState, useEffect } from 'react';
import { type Project, type ProjectFilters } from '../types';
import { projectService } from '../services/projectService';
import toast from 'react-hot-toast';

export const useProjects = (filters: ProjectFilters = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await projectService.getProjects(filters);
      setProjects(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar proyectos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters.page, filters.status, filters.search]);

  const createProject = async (data: Partial<Project>) => {
    try {
      const newProject = await projectService.createProject(data);
      setProjects([newProject, ...projects]);
      toast.success('Proyecto creado exitosamente');
      return newProject;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear proyecto');
      throw error;
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      const updated = await projectService.updateProject(id, data);
      setProjects(projects.map(p => p.id === id ? updated : p));
      toast.success('Proyecto actualizado exitosamente');
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar proyecto');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Proyecto eliminado exitosamente');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar proyecto');
      throw error;
    }
  };

  return {
    projects,
    isLoading,
    totalPages,
    currentPage,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
