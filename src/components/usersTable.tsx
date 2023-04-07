import React from 'react';
import { IUser } from '../models';
import BookmarkIcon from './bookmarkIcon';
import QualityList from './qualityList';
import Table from './table';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

interface TableProps {
  users: IUser[];
  onDelete: any;
  onBookmarkChange: any;
  onSort: any;
  sortBy: any;
}

const UsersTable = ({ users, onSort, sortBy, onDelete, onBookmarkChange }: TableProps) => {
  const columns = {
    name: { path: 'name', title: 'Имя' },
    qualities: {
      title: 'Качества',
      component: (user) => <QualityList qualities={user.qualities} />,
    },
    prof: { path: 'profession.name', title: 'Проффесия' },
    completedMeetings: { path: 'completedMeetings', title: 'Встретился, раз' },
    rate: { path: 'rate', title: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      title: 'Избранное',
      component: (user) => (
        <BookmarkIcon
          status={user.bookmark}
          onChange={() => {
            onBookmarkChange(user._id);
          }}
        />
      ),
    },
    del: {
      title: '',
      component: (user) => (
        <span className="btn btn-danger p-1" onClick={() => onDelete(user._id)}>
          delete
        </span>
      ),
    },
  };

  return (
    <Table>
      <TableHeader columns={columns} onSort={onSort} sortBy={sortBy} />
      <TableBody columns={columns} data={users} />
    </Table>
  );
};

export default UsersTable;
