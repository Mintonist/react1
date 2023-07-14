import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersLoadingStatus, loadUsersList } from '../../../store/users';

const UsersLoader = ({ children }) => {
  const isUsersLoading = useSelector(getUsersLoadingStatus());
  const dispatch: any = useDispatch();
  console.log('UsersLoader render');
  useEffect(() => {
    if (isUsersLoading) {
      dispatch(loadUsersList());
    }
  }, []);
  if (isUsersLoading) {
    return <>Loading users..</>;
  }
  return children;
};

export default UsersLoader;
