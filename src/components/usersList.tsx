import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/index.js';
import { IProffession, IUser } from '../models.js';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import query from 'query-string';

import _ from 'lodash';

const UsersList = () => {
  const location = useLocation();
  const search = query.parse(location.search);
  const pageSize: number = search && search.count && +search.count > 1 ? +search.count : 8;

  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState<IUser[]>([]);
  const [professions, setProfessions] = useState<IProffession[]>([]);
  const [selectedProfID, setSelectedProfID] = useState<string>(null);
  const [sortBy, setSortBy] = useState({ path: null, order: 'asc' });

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handlePageChange = (index) => {
    console.log('Page index = ' + index);
    setCurrentPage(index);
  };

  const handleSort = (newSortBy: any) => {
    setSortBy(newSortBy);
  };

  const handleDelete = (id: string) => setUsers((prevState) => prevState.filter((u) => u._id !== id));

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

  const filteredUsers = selectedProfID ? users.filter((u) => u.profession._id == selectedProfID) : users;
  const sortedUsers = sortBy.path ? _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]) : filteredUsers;
  const croppedUsers = paginate(sortedUsers, currentPage, pageSize);

  const handleProfessionSelect = (id) => {
    setCurrentPage(1);
    setSelectedProfID(id);
  };
  const clearFilter = () => {
    setCurrentPage(1);
    setSelectedProfID(null);
  };

  return (
    <div className="d-flex">
      {professions.length > 0 && (
        <div className="d-flex flex-column px-2">
          <GroupList selectedID={selectedProfID} items={professions} onItemSelect={handleProfessionSelect}></GroupList>
          <button className="btn btn-secondary py-1" onClick={clearFilter}>
            Сбросить
          </button>
        </div>
      )}
      {users.length == 0 ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border p-10" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <SearchStatus amount={filteredUsers.length} />
          <UsersTable
            users={croppedUsers}
            onSort={handleSort}
            sortBy={sortBy}
            onDelete={handleDelete}
            onBookmarkChange={handleBookmarkChange}
          ></UsersTable>
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={filteredUsers.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
