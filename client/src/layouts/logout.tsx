import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/users';
//import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  // const { logout } = useAuth();
  const dispatch: any = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(logout());
    history.push('/');
  }, []);

  return <div className="container mt-5">Loading...</div>;
};

export default Logout;
