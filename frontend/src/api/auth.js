import api from '@api/axiosConfig';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al iniciar sesión';
  }
};
