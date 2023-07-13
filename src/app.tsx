import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import NotFound from './layouts/notFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { ProfessionsProvider } from './hooks/useProfessions';
//import { QualitiesProvider } from './hooks/useQualities';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRout from './components/common/protectedRout';
import Logout from './layouts/logout';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/professions';

const App = () => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/users/:userId?/edit" component={Users} /> */}
          <ProtectedRout path="/users/:userId?" component={Users} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/404" component={NotFound} />
          <Redirect exact from="/" to="/main" />
          <Redirect to="/404" />
        </Switch>
      </AuthProvider>
      <ToastContainer autoClose={false} closeButton={true} position={'top-center'} />
    </>
  );
};

export default App;
