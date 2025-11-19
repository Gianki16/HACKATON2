import Papa from 'papaparse';
import { type Task } from '../types';
import { format } from 'date-fns';

export const exportTasksToCSV = (tasks: Task[]) => {
  const csvData = tasks.map(task => ({
    'ID': task.id,
    'Título': task.title,
    'Descripción': task.description,
    'Estado': task.status,
    'Prioridad': task.priority,
    'Proyecto': task.project?.name || 'N/A',
    'Asignado a': task.assignedUser?.name || 'Sin asignar',
    'Fecha de vencimiento': task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yyyy') : 'N/A',
    'Fecha de creación': format(new Date(task.createdAt), 'dd/MM/yyyy HH:mm'),
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `tareas_${format(new Date(), 'yyyy-MM-dd_HHmm')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
