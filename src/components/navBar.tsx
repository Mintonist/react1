import * as React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const pages = [
    { id: 1, label: 'Main', link: '/' },
    { id: 2, label: 'Login', link: '/login' },
    { id: 3, label: 'Users', link: '/users' },
  ];
  const [activePage, setActivePage] = React.useState(1);

  return (
    <ul className="nav nav-pills px-2 pt-2">
      {pages.map((page) => (
        <li key={page.id} className="nav-item">
          <Link
            className={'nav-link ' + (activePage == page.id ? 'active' : '')}
            aria-current="page"
            to={page.link}
            onClick={() => setActivePage(page.id)}
          >
            {page.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
