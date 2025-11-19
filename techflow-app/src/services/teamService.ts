import api from './api';
import { type TeamMember, type Task } from '../types';

export const teamService = {
  async getMembers(): Promise<TeamMember[]> {
    const response = await api.get('/team/members');
    return response.data.members || [];
  },

  async getMemberTasks(memberId: string): Promise<Task[]> {
    const response = await api.get(`/team/members/${memberId}/tasks`);
    return response.data.tasks || [];
  },
};
