import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserEditForm from '../components/ui/userEditForm';
import { useHistory } from 'react-router-dom';

import UsersLoader from '../components/ui/hoc/usersLoader';
//import { UsersProvider } from '../hooks/useUsers';

const Users = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { pathname } = useLocation();
  const isEdit = String(pathname).endsWith('/edit');

  return (
    <UsersLoader>
      {userId ? (
        isEdit ? (
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-1 p-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    history.replace(`/users/${userId}`);
                  }}
                >
                  Назад
                </button>
              </div>
              <div className="col-md-6 offset-md-3 shadow p-4">
                <h3 className="mb-4">Анкета</h3>
                <UserEditForm id={userId} />
              </div>
            </div>
          </div>
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  );
};

export default Users;
