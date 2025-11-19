import React, { useState, useEffect } from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { type DashboardStats } from '../types';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Obtener tareas y proyectos con manejo de errores
        const [tasksResponse, projectsResponse] = await Promise.all([
          taskService.getTasks({ limit: 1000 }).catch(() => ({ data: [], totalPages: 1, currentPage: 1 })),
          projectService.getProjects({ limit: 1000 }).catch(() => ({ data: [], totalPages: 1, currentPage: 1 })),
        ]);

        const tasks = tasksResponse.data || [];
        const projects = projectsResponse.data || [];

        const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
        const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED').length;
        
        // Calcular tareas vencidas de forma segura
        const now = new Date();
        const overdueTasks = tasks.filter(t => {
          if (!t.dueDate || t.status === 'COMPLETED') return false;
          try {
            return new Date(t.dueDate) < now;
          } catch {
            return false;
          }
        }).length;
        
        const activeProjects = projects.filter(p => p.status === 'ACTIVE').length;

        setStats({
          totalTasks: tasks.length,
          completedTasks,
          pendingTasks,
          overdueTasks,
          totalProjects: projects.length,
          activeProjects,
        });
      } catch (error: any) {
        console.error('Error cargando estadísticas:', error);
        // No mostrar error, solo usar valores por defecto
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          overdueTasks: 0,
          totalProjects: 0,
          activeProjects: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Resumen de tus proyectos y tareas
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Tareas"
          value={stats.totalTasks}
          icon={CheckCircleIcon}
          color="blue"
        />
        <StatCard
          title="Tareas Completadas"
          value={stats.completedTasks}
          icon={CheckCircleIcon}
          color="green"
        />
        <StatCard
          title="Tareas Pendientes"
          value={stats.pendingTasks}
          icon={ClockIcon}
          color="yellow"
        />
        <StatCard
          title="Tareas Vencidas"
          value={stats.overdueTasks}
          icon={ExclamationCircleIcon}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total de Proyectos"
          value={stats.totalProjects}
          icon={FolderIcon}
          color="purple"
        />
        <StatCard
          title="Proyectos Activos"
          value={stats.activeProjects}
          icon={FolderIcon}
          color="blue"
        />
      </div>

      {/* Quick Actions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};
