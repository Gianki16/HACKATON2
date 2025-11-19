import React, { useState, useEffect } from 'react';
import { TeamMemberList } from '../components/team/TeamMemberList';
import { teamService } from '../services/teamService';
import { TeamMember } from '../types';
import { UsersIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const Team: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const data = await teamService.getMembers();
        setMembers(data);
      } catch (error: any) {
        toast.error('Error al cargar miembros del equipo');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <UsersIcon className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
            Equipo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Miembros de tu equipo y sus tareas asignadas
          </p>
        </div>
      </div>

      <TeamMemberList members={members} isLoading={isLoading} />
    </div>
  );
};
