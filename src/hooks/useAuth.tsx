import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import userService from '../services/user.service';
import localStorageService from '../services/localstorage.service';
import { toast } from 'react-toastify';
import { IUser } from '../models';
import axios from 'axios';

interface IAuthContext {
  user?: IUser;
  login?: (any) => any;
  //   updateUser?: (string, any) => Promise<IUser>;
  //   addUser?: (any) => Promise<IUser>;
  //   deleteUser?: (string) => Promise<IUser>;
}

const AuthContext = createContext<IAuthContext>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<IUser>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setLoading] = useState(true);

  async function login({ email, pass, ...rest }) {
    try {
      const url = `https://xxx.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
      const { data } = await axios.post(url, { email, pass, returnSecureToken: true });

      console.log(data);

      localStorageService.setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (err) {
      catchError(err);
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.add(data);
      console.log(content);
      setUser(content);
    } catch (err) {
      catchError(err);
    }
  }

  const catchError = (err) => {
    // const { message, code } = err.response.data;
    // const status = err.response.status;
    // console.log('Expected error: ' + status, code, message);
    setError(String(err));
  };

  useEffect(() => {
    if (error) {
      console.log('toast.error()', error);
      toast.error(error);
    }
    setError(null);
  }, [error]);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {!isLoading ? children : <h2>Loading users...</h2>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
