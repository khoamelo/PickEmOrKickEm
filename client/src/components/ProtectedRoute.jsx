import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// ProtectedRoute component ensures only authenticated users can access certain routes
const ProtectedRoute = ({ children }) => {
  // State to track authentication status
  const [isAuth, setIsAuth] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      // Get JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuth(false); // If no token, user is not authenticated
        return;
      }
      try {
        // Verify the token by making a request to the backend, sending the token in headers
        await axios.get('http://localhost:4005/auth/verifyUser', {
          headers: { token }
        });
        setIsAuth(true); // If token is valid, user is authenticated
      } catch {
        setIsAuth(false); // If token verification fails, user is not authenticated
      }
    };
    checkAuth();
  }, []);

  // If authentication status is still being determined, return null to avoid rendering
  if (isAuth === null) return null;

  // If user is authenticated, render the children components; otherwise, redirect to login page
  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;