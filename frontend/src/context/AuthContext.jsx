import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '@api/auth';
import { Navigate } from 'react-router-dom';
import { setLogoutFunction } from '@utils/authManager';
import { useNotification } from '@context/NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addNotification } = useNotification();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser')) || null
  );
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  /**
   * Maneja el proceso de inicio de sesión del usuario.
   *
   * @param {Object} credentials Credenciales del usuario (username y password).
   * @returns {void}
   * @throws {void} Maneja los errores mostrando notificaciones.
   */
  const handleLogin = async (credentials) => {
    try {
      const data = await apiLogin(credentials);
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('authUser', JSON.stringify(data.data.user));
      setToken(data.data.token);
      setUser(data.data.user);
      addNotification(data.message);
    } catch (error) {
      addNotification(error.message, 'danger');
    }
  };

  /**
   * Maneja el proceso de cierre de sesión del usuario.
   *
   * @returns {void}
   */
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
    <Navigate to="/login" />;
  };

  useEffect(() => {
    setLogoutFunction(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
