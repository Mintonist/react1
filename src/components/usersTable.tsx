import React, { useState } from 'react';
import { useEffect } from 'react';
import api from '../api/index.js';
import { IUser } from '../models.js';
import SearchStatus from './searchStatus';
import UserRow from './userRow';

const UsersTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  console.log('UsersTable');

  useEffect(() => {
    setUsers(api.users.fetchAll());
  }, []);

  const renderRows = (arr: IUser[]) => {
    return arr.map((u) => (
      <UserRow
        user={u}
        key={u._id}
        onDelete={handleDelete}
        onBookmarkChange={handleBookmarkChange}
      />
    ));
  };

  const handleDelete = (id: string) =>
    setUsers((prevState) => prevState.filter((u) => u._id !== id));

  // const handleAddUser = () => {
  //   console.log('handleAddUser()');
  //   users.push({
  //     _id: '6',
  //     name: 'тест',
  //     profession: undefined,
  //     qualities: [],
  //     completedMeetings: 72,
  //     rate: 3.5,
  //     bookmark: false,
  //   });
  //   setUsers(users);
  // };

  //--> если менять только ссылку на сам массив через .concat([]) -  почему первый раз bookmark меняется и перерисовывается, а дальше нет?
  const handleBookmarkChange = (id: string) => {
    console.log('BookmarkIcon: onChange() ' + id);
    setUsers((prevState) => {
      return prevState.map((u) => {
        if (u._id == id) {
          return { ...u, bookmark: !u.bookmark };
        }
        return u;
      });
    });
  };

  return (
    <>
      <SearchStatus amount={users.length} />
      <table className="table">
        <thead className="text-center">
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Проффесия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="align-middle table-group-divider">
          {renderRows(users)}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
