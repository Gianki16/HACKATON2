import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
};

export const isOverdue = (dueDate: string | Date): boolean => {
  return new Date(dueDate) < new Date();
};
