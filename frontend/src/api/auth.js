import api from '@api/axiosConfig';

/**
 * Realiza la autenticación del usuario.
 *
 * @param {Object} credentials Credenciales del usuario (username y password).
 * @returns {Promise<Object>} token y usaurio.
 * @throws {string} Mensaje del servidor o 'Error al iniciar sesión'.
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al iniciar sesión';
  }
};
