import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/navBar';

import Main from './pages/mainPage';
import Login from './pages/loginPage';
import Users from './pages/usersPage';
import NotFound from './pages/notFoundPage';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        {/* <Route path="/users/:userId" component={UserInfo} />
        <Route exact path="/users" component={UsersList} /> */}
        <Route exact path="/main" component={Main} />
        <Route exact path="/404" component={NotFound} />
        <Redirect exact from="/" to="/main" />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};

export default App;
