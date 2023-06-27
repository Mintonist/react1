import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './navProfile';

const NavBar = () => {
  const { user } = useAuth();

  const pages = [{ id: 1, label: 'Main', link: '/main' }];

  if (!user) {
    pages.push({ id: 2, label: 'Login', link: '/login' });
  }

  if (user) {
    pages.push({ id: 3, label: 'Users', link: '/users' });
  }

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <ul className="nav nav-pills px-2 pt-2">
          {pages.map((page) => (
            <li key={page.id} className="nav-item">
              <NavLink activeClassName="active" className="nav-link" aria-current="page" to={page.link}>
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {user && <NavProfile />}
        {/* <div className="d-flex">{user && <p>{user.name}</p>}</div> */}
      </div>
    </nav>
  );
};

export default NavBar;
