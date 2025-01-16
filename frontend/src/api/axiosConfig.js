import axios from 'axios';
import { getLogoutFunction } from '@utils/authManager';

const api = axios.create({
  baseURL: 'http://localhost/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status == 401) {
      const logout = getLogoutFunction();
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
