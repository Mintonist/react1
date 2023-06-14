import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import NotFound from './layouts/notFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfessionsProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionsProvider>
        <QualitiesProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?/edit" component={Users} />
            <Route path="/users/:userId?" component={Users} />

            {/* <Route path="/users/:userId" component={UserInfo} />
        <Route exact path="/users" component={UsersList} /> */}
            <Route exact path="/main" component={Main} />
            <Route exact path="/404" component={NotFound} />
            <Redirect exact from="/" to="/main" />
            <Redirect to="/404" />
          </Switch>
        </QualitiesProvider>
      </ProfessionsProvider>
      <ToastContainer autoClose={false} closeButton={true} position={'top-center'} />
    </>
  );
};

export default App;
