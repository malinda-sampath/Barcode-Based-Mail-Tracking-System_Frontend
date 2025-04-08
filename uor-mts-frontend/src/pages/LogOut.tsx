import React, { useEffect } from 'react';
import { logoutUser } from '../services/LogoutService';
import { useNavigate } from 'react-router-dom';

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // Always redirect to home page after logout attempt
        navigate('/', { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  // Return null to render nothing
  return null;
};

export default LogOut;