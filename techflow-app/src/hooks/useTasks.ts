import { useState, useEffect } from 'react';
import { Task, TaskFilters } from '../types';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';

export const useTasks = (filters: TaskFilters = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await taskService.getTasks(filters);
      setTasks(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cargar tareas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters.page, filters.status, filters.priority, filters.projectId, filters.assignedTo]);

  const createTask = async (data: Partial<Task>) => {
    try {
      const newTask = await taskService.createTask(data);
      setTasks([newTask, ...tasks]);
      toast.success('Tarea creada exitosamente');
      return newTask;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear tarea');
      throw error;
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      const updated = await taskService.updateTask(id, data);
      setTasks(tasks.map(t => t.id === id ? updated : t));
      toast.success('Tarea actualizada exitosamente');
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar tarea');
      throw error;
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    try {
      const updated = await taskService.updateTaskStatus(id, status);
      setTasks(tasks.map(t => t.id === id ? updated : t));
      toast.success('Estado actualizado');
      return updated;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar estado');
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Tarea eliminada exitosamente');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar tarea');
      throw error;
    }
  };

  return {
    tasks,
    isLoading,
    totalPages,
    currentPage,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
};
