import { apiClient } from '../axios';

export const authApi = {
  login: async (data: any) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  signup: async (data: any) => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },
  verifyEmail: async (data: { email: string; token: string }) => {
    const response = await apiClient.post('/auth/verify-email', data);
    return response.data;
  },
  resendVerification: async (data: { email: string }) => {
    const response = await apiClient.post('/auth/resend-verification', data);
    return response.data;
  },
  forgotPassword: async (data: { email: string }) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },
  resetPassword: async (data: any) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },
  acceptInvite: async (data: { inviteToken: string; password: string }) => {
    const response = await apiClient.post('/auth/accept-invite', data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
};
