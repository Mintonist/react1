import React from 'react';
import { IQuality, IUser } from '../models';
import BookmarkIcon from './bookmarkIcon';
import QualityBadge from './qualityBadge';

interface RowProps {
  user: IUser;
  onDelete: any;
  onBookmarkChange: any;
}

const renderQualities = (arr: IQuality[]) => {
  return arr.map((q) => (
    <QualityBadge key={q._id} color={q.color} title={q.name} />
  ));
};

const renderBookmark = (user: IUser, onBookmarkChange: any) => {
  return (
    <BookmarkIcon
      status={user.bookmark}
      onChange={() => {
        onBookmarkChange(user._id);
      }}
    />
  );
};

const UserRow = ({ user, onDelete, onBookmarkChange }: RowProps) => {
  return (
    <tr>
      <th>{user.name}</th>
      <th>{renderQualities(user.qualities)}</th>
      <th>{user.profession ? user.profession.name : 'нет'}</th>
      <th className="text-center">{user.completedMeetings}</th>
      <th className="text-center">{user.rate}/5</th>
      <th className="text-center">{renderBookmark(user, onBookmarkChange)}</th>
      <th>
        <span className="btn btn-danger p-1" onClick={() => onDelete(user._id)}>
          delete
        </span>
      </th>
    </tr>
  );
};

export default UserRow;
