import { apiClient } from '../axios';

export interface TravelRoute {
  id: number;
  name: string;
  rate: number;
  start_destination: string;
  end_destination: string;
  created_at?: string;
  updated_at?: string;
}

export const routesApi = {
  getRoutes: async (params?: { name?: string; startDestination?: string; endDestination?: string }) => {
    const response = await apiClient.get('/routes', { params });
    return response.data;
  },
  
  createRoute: async (data: { name: string; rate: number; startDestination: string; endDestination: string }) => {
    const response = await apiClient.post('/routes', data);
    return response.data;
  },

  updateRoute: async (id: number, data: { name: string; rate: number; startDestination: string; endDestination: string }) => {
    const response = await apiClient.put(`/routes/${id}`, data);
    return response.data;
  },

  deleteRoute: async (id: number) => {
    const response = await apiClient.delete(`/routes/${id}`);
    return response.data;
  }
};
