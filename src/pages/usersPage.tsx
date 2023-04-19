import React from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/userInfo';
import UsersList from '../components/usersList';

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserInfo id={userId} /> : <UsersList />}</>;
};

export default Users;
