import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/loginPage';
import Main from './components/mainPage';
import NavBar from './components/navBar';
import NotFound from './components/not-found';
import User from './components/userPage';
import Users from './components/users';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/" component={Main} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};

export default App;
