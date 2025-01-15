import axios from 'axios';

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

export default api;
