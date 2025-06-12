import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuth(false);
        return;
      }
      try {
        await axios.get('http://localhost:4005/auth/verifyUser', {
          headers: { token }
        });
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;