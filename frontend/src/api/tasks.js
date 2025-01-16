import api from '@api/axiosConfig';

export const getTasks = async ({ status, search = '' }) => {
  try {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener lista de tareas';
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al elimnar la tarea';
  }
};
