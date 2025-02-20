import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_KEY = 'admin_auth';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default RequireAuth;