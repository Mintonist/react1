import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IUser } from '../models';
import api from '../api/index.js';
import QualityList from './qualityList';

const User = () => {
  const history = useHistory();

  const [user, setUser] = useState<IUser>(null);

  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      {user && (
        <div className="mx-2">
          <hr />
          <h2>{user.name}</h2>
          <hr />
          <h3>{'Профессия: ' + user.profession.name}</h3>
          <p>
            <QualityList qualities={user.qualities} />
          </p>
          <h3>{'Встретился, раз: ' + user.completedMeetings}</h3>
          <h3>{'Рейтинг: ' + user.rate}</h3>
        </div>
      )}
      {user === null && <h2>Loading...</h2>}
      {user === undefined && <h2>{'User with id=' + userId + ' not found.'}</h2>}
      <hr />
      <button
        className="mx-2 my-4"
        onClick={() => {
          history.replace('/users');
        }}
      >
        Все пользователи
      </button>
    </>
  );
};

export default User;
