import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import userService from '../services/user.service';
import localStorageService from '../services/localstorage.service';
import { toast } from 'react-toastify';
import { IUser } from '../models';
import axios from 'axios';

interface IAuthContext {
  user?: IUser;
  login?: (any) => any;
  signUp?: (any) => any;
}

const AuthContext = createContext<IAuthContext>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<IUser>(null);
  const [error, setError] = useState<string>(null);
  // const [isLoading, setLoading] = useState(true);

  async function login({ email, password }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
      const { data } = await axios.post(url, { email, password, returnSecureToken: true });

      localStorageService.setTokens(data);
    } catch (err) {
      const { code, message } = err.response.data.error;

      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const e = { email: 'Email не найден' };

          throw e;
        }
        if (message === 'INVALID_PASSWORD') {
          const e = { password: 'Пароль недействителен' };

          throw e;
        }
        if (message === 'USER_DISABLED') {
          const e = { email: 'Учетная запись пользователя отключена' };

          throw e;
        } else {
          catchError(err);
        }
      } else {
        catchError(err);
      }
    }
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
      const { data } = await axios.post(url, { email, password, returnSecureToken: true });

      localStorageService.setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (err) {
      const { code, message } = err.response.data.error;

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const e = { email: 'Email занят' };

          throw e;
        } else {
          catchError(err);
        }
      } else {
        catchError(err);
      }
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

  return <AuthContext.Provider value={{ user, login, signUp }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
