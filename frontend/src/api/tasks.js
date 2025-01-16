import api from '@api/axiosConfig';

/**
 * Obtiene una lista de tareas con filtros opcionales.
 *
 * @param {Object} [filters] Filtros opcionales para la consulta.
 * @returns {Promise<Object>} Lista de tareas y datos relacionados con la paginación.
 * @throws {string} Mensaje del servidor o 'Error al obtener lista de tareas'.
 */
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

/**
 * Crea una nueva tarea.
 *
 * @param {Object} task Datos de la nueva tarea.
 * @returns {Promise<Object>} Confirmación y tarea creada.
 * @throws {string} Mensaje del servidor o 'Error al crear la tarea'.
 */
export const createTask = async (task) => {
  try {
    const response = await api.post(`/tasks/`, task);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear la tareas';
  }
};

/**
 * Edita una tarea existente por su Id.
 *
 * @param {Object} task Datos actualizados de la tarea.
 * @param {number|string} taskId Id de la tarea a editar.
 * @returns {Promise<Object>} confirmacion y tarea editada.
 * @throws {string} Mensaje del servidor o 'Error al editar la tarea'.
 */
export const editTask = async (task, taskId) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, task);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al editar la tarea';
  }
};

/**
 * Elimina una tarea por su ID.
 *
 * @param {number|string} taskId Id de la tarea a eliminar.
 * @returns {Promise<Object>} confirmacion y tarea eliminada.
 * @throws {string} Mensaje del servidor o 'Error al elimnar la tarea'.
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al elimnar la tarea';
  }
};
