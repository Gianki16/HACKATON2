import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { type TeamMember } from '../../types';

interface TeamMemberListProps {
  members: TeamMember[];
  isLoading: boolean;
}

export const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No se encontraron miembros del equipo
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};
