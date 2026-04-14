import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Access the backend at localhost for development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    // We get the current state of the auth store
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401s (Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and logout
      const clearAuth = useAuthStore.getState().clearAuth;
      clearAuth();
      // Optional: window.location.href = '/login'; if you want to force redirect here
    }
    return Promise.reject(error);
  }
);
