import { IUser } from '../models';
import httpService from './http.service';
import { CONFIG } from '../config';
import api from '../api/index.js';
import axios from 'axios';
import localStorageService from './localstorage.service';

// нужно создать отдельный экземпляр axios c настройками и interceptors которые используются здесь, но не мешают использовать "чистый" axios где-то ещё в проекте
export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post('accounts:signUp', { email, password, returnSecureToken: true });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post('accounts:signInWithPassword', { email, password, returnSecureToken: true });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
