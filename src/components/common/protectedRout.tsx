import * as React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRout = ({ component: Component, children = null, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRout;
