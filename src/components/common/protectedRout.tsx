import * as React from 'react';
import { useSelector } from 'react-redux';
//import { useAuth } from '../../hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/users';

const ProtectedRout = ({ component: Component, children = null, ...rest }) => {
  //const { user } = useAuth();
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRout;
