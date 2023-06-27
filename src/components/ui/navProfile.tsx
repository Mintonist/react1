import * as React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getAvatarUrl } from '../../utils/avatarUrl';
import { Link } from 'react-router-dom';

const NavProfile = () => {
  const { user } = useAuth();
  const [isOpen, setOpen] = React.useState(false);

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{user.name}</div>
        <img
          src={getAvatarUrl(user)}
          className="img-responsive rounded-circle shadow-1-strong me-3"
          alt="avatar"
          width="40"
          height="40"
        />
        <img src="" alt="" className="img-responsive rounded-circle" />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={'/users/' + user._id} className="dropdown-item">
          Profile
        </Link>
        <Link to={'/logout'} className="dropdown-item">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
