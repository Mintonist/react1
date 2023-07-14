import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/users';
//import { useAuth } from '../hooks/useAuth';

const Logout = () => {
  // const { logout } = useAuth();
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <div className="container mt-5">Loading...</div>;
};

export default Logout;
