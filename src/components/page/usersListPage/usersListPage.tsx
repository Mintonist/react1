import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import Pagination from '../../common/pagination';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import TextField from '../../common/form/textField';

import query from 'query-string';
import _ from 'lodash';
import { useUsers } from '../../../hooks/useUsers';
//import { useProfessions } from '../../../hooks/useProfessions';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getProfessions } from '../../../store/professions';

const UsersListPage = () => {
  const location = useLocation();
  const search = query.parse(location.search);
  const pageSize: number = search && search.count && +search.count > 1 ? +search.count : 8;
  const [searchString, setSearchString] = useState('');
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const { users, updateUser } = useUsers();

  //const { professions } = useProfessions();
  const professions = useSelector(getProfessions());

  const [selectedProfID, setSelectedProfID] = useState<string>(null);
  const [sortBy, setSortBy] = useState({ path: null, order: 'asc' });

  // useEffect(() => {
  //   //api.users.fetchAll().then((data) => setUsers(data));
  //  // api.professions.fetchAll().then((data) => setProfessions(data));
  // }, []);

  const handlePageChange = (index) => {
    console.log('Page index = ' + index);
    setCurrentPage(index);
  };

  const handleSearchStringChange = (target) => {
    const value: string = target.value.trim();
    setSearchString(value);
    if (value.length > 0) {
      clearFilter();
    }
  };

  const handleSort = (newSortBy: any) => {
    setSortBy(newSortBy);
  };

  // const handleDelete = (id: string) => {
  //   deleteUser(id);
  //   // setUsers((prevState) => prevState.filter((u) => u._id !== id));
  // };

  //--> если менять только ссылку на сам массив через .concat([]) -  почему первый раз bookmark меняется и перерисовывается, а дальше нет?
  const handleBookmarkChange = (id: string) => {
    console.log('BookmarkIcon: onChange() ' + id);
    const u = users.find((u) => u._id == id);
    updateUser(id, { ...u, bookmark: !u.bookmark });
    // setUsers((prevState) => {
    //   return prevState.map((u) => {
    //     if (u._id == id) {
    //       return { ...u, bookmark: !u.bookmark };
    //     }
    //     return u;
    //   });
    // });
  };

  let filteredUsers = selectedProfID
    ? users.filter((u) => u.profession == selectedProfID)
    : searchString
    ? users.filter((u) => u.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1)
    : users;
  filteredUsers = filteredUsers.filter((u) => u._id != user._id);
  const sortedUsers = sortBy.path ? _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]) : filteredUsers;
  const croppedUsers = paginate(sortedUsers, currentPage, pageSize);

  const handleProfessionSelect = (id) => {
    setSearchString('');
    setCurrentPage(1);
    setSelectedProfID(id);
  };

  const clearFilter = () => {
    setCurrentPage(1);
    setSelectedProfID(null);
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column px-2">
          <GroupList selectedID={selectedProfID} items={professions} onItemSelect={handleProfessionSelect}></GroupList>
          <button className="btn btn-secondary py-1" onClick={clearFilter}>
            Сбросить
          </button>
        </div>
      )}
      {users.length == 0 ? (
        <div className="container mt-5">
          <p> Нет пользователей</p>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <SearchStatus amount={filteredUsers.length} />
          <div className="mt-1">
            <TextField placeholder="search..." name="search" value={searchString} onChange={handleSearchStringChange} />
          </div>
          <UsersTable
            users={croppedUsers}
            onSort={handleSort}
            sortBy={sortBy}
            // onDelete={handleDelete}
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

export default UsersListPage;
