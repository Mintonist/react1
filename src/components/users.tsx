import React, { useState } from 'react';
import api from '../api/index.js';
import { IUser } from '../models.js';
import Row from './row';

const Users = () => {
  let [users, setUsers] = useState(api.users.fetchAll());

  const declOfNum = (
    num: number,
    titles: Array<string>,
    insertValue: Boolean = false
  ) => {
    const cases = [2, 0, 1, 1, 1, 2];
    let res: string =
      titles[
        num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]
      ];
    if (insertValue) {
      res = num + ' ' + res;
    }
    return res;
  };

  const renderPeopleAmount = () =>
    users.length == 0
      ? 'никого здесь нет!'
      : declOfNum(users.length, ['человек', 'человека', 'человек'], true) +
        ' вступили в секту';

  const renderRows = (arr: IUser[]) => {
    return arr.map((u) => (
      <Row user={u} key={u._id} onDelete={deleteHandler} />
    ));
  };

  const deleteHandler = (id: string) =>
    setUsers((prevState) => prevState.filter((u) => u._id !== id));

  return (
    <>
      <p
        className={
          'badge ' + (users.length ? 'bg-primary' : 'bg-danger') + ' p-2'
        }
      >
        {renderPeopleAmount()}
      </p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Проффесия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderRows(users)}</tbody>
      </table>
    </>
  );
};

export default Users;
