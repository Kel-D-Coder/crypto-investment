import { useState, useEffect } from 'react';
import { isTokenExpired } from '../utils/tokenUtils';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token && !isTokenExpired(token));
      setIsLoading(false);
    };

    checkAuth();
    // Optional: Set up an interval to check periodically
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated, isLoading };
}; 