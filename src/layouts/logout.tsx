import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <div className="container mt-5">Loading...</div>;
};

export default Logout;
