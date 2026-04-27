import { apiClient } from '../axios';

export interface Trip {
  id: number;
  title: string;
  description: string | null;
  user_id: number;
  employee_name: string;
  organization_id: number;
  route_id: number;
  route_name: string;
  route_rate: number;
  start_location_address: string;
  end_location_address: string | null;
  start_time: string;
  end_time: string | null;
  status: 'IN_PROGRESS' | 'COMPLETED_PENDING' | 'APPROVED' | 'REJECTED';
  start_mileage: number;
  end_mileage: number | null;
  distance: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  start_odometer_img?: string | null;
  end_odometer_img?: string | null;
  [key: string]: any;
}

export const tripsApi = {
  getTrips: async (params?: { status?: string; page?: number; limit?: number; user_id?: number }) => {
    const response = await apiClient.get('/trips', { params });
    return response.data;
  },

  getTripDetails: async (id: number) => {
    const response = await apiClient.get(`/trips/${id}`);
    return response.data;
  },

  updateTripStatus: async (id: number, status: 'APPROVED' | 'REJECTED') => {
    const response = await apiClient.patch(`/trips/${id}/status`, { status });
    return response.data;
  },

  updateTripMetrics: async (id: number, data: { distance?: number; total_price?: number }) => {
    const response = await apiClient.patch(`/trips/${id}/metrics`, data);
    return response.data;
  },
  
  getTripStats: async () => {
    const response = await apiClient.get('/trips/stats');
    return response.data;
  }
};
