import React from 'react';
import { IUser } from '../../models';
import { useHistory } from 'react-router-dom';
import { getAvatarUrl } from '../../utils/avatarUrl';
import ProfessionBadge from './professionBadge';
import { useSelector } from 'react-redux';
import { getCurrentUserInfo } from '../../store/users';
//import { useAuth } from '../../hooks/useAuth';

interface Props {
  user: IUser;
}

const UserCard = ({ user }: Props) => {
  const history = useHistory();
  //const { user: curUser } = useAuth();
  const curUser = useSelector(getCurrentUserInfo());
  return (
    <div className="card mb-3">
      <div className="card-body">
        {curUser._id == user._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={() => {
              history.replace(`/users/${user._id}/edit`);
            }}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={getAvatarUrl(user)} alt="avatar" className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">
              {'Профессия: ' + user.profession ? <ProfessionBadge id={user.profession} /> : 'нет'}
            </p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{'Рейтинг: ' + user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
