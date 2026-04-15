import { apiClient } from '../axios';

export const employeesApi = {
  getEmployees: async (search?: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get('/users', {
      params: { search, page, limit }
    });
    return response.data;
  },
  
  getDetails: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  updateEmployee: async (id: string, data: any) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },
  
  deleteEmployee: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
  
  inviteEmployee: async (data: { email: string; fullname: string; role: 'MANAGER' | 'EMPLOYEE'; manager_id?: string }) => {
    const response = await apiClient.post('/auth/invite-employee', data);
    return response.data;
  },
  
  getInvitations: async () => {
    const response = await apiClient.get('/auth/invitations');
    return response.data;
  }
};
