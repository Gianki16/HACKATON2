import React from 'react';
import { Card } from '../common/Card';
import { type TeamMember } from '../../types';
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <Card hover>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <UserCircleIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {member.email}
          </p>
          {member.tasksCount !== undefined && (
            <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              {member.tasksCount} tareas asignadas
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
