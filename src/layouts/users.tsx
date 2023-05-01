import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserEditForm from '../components/ui/userEditForm';

const Users = () => {
  const { userId } = useParams();
  const { pathname } = useLocation();
  if (userId) {
    if (String(pathname).endsWith('/edit')) {
      return (
        <>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3 shadow p-4">
                <h3 className="mb-4">Анкета</h3>
                <UserEditForm id={userId} />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <UserPage id={userId} />;
    }
  } else {
    return <UsersListPage />;
  }
  //return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

export default Users;
