import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export const PotectedRoute = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
};
