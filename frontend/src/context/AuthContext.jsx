import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin } from '@api/auth';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('authUser') || null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  const handleLogin = async (credentials) => {
    try {
      const data = await apiLogin(credentials);
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('authUser', JSON.stringify(data.data.user));
      setToken(data.data.token);
      setUser(data.data.user);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
