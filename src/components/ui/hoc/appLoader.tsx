import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfessionsList } from '../../../store/professions';
import { loadQualitiesList } from '../../../store/qualities';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';

const AppLoader = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isUsersLoading = useSelector(getUsersLoadingStatus());
  const dispatch: any = useDispatch();

  console.log('AppLoader render');

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, []);

  useEffect(() => {
    console.log('AppLoader isLoggedIn changed');
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  // if (isUsersLoading) {
  //   return 'Loading users....';
  // }
  return children;
};

export default AppLoader;
