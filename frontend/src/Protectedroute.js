import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Protectedroute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/404" replace />;
}

export default Protectedroute
