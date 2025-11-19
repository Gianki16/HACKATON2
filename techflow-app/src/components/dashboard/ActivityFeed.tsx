import React from 'react';
import { Card } from '../common/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'project' | 'task' | 'team';
  action: string;
  timestamp: string;
}

export const ActivityFeed: React.FC = () => {
  // Esto se puede conectar con datos reales de la API
  const activities: Activity[] = [];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Actividad Reciente
      </h3>
      
      {activities.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No hay actividad reciente
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format(new Date(activity.timestamp), "PPp", { locale: es })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
