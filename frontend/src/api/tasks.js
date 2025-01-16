import api from '@api/axiosConfig';

export const getTasks = async ({ status, search = '', page = 1 } = {}) => {
  try {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    if (page) params.append('page', page);

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener lista de tareas';
  }
};

export const createTask = async (task) => {
  try {
    const response = await api.post(`/tasks/`, task);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear la tareas';
  }
};

export const editTask = async (task, taskId) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, task);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al editar la tareas';
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
