import { useHistory } from 'react-router-dom';
import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localstorage.service';
import userService from '../services/user.service';

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  auth: localStorageService.getAccessToken() ? { userId: localStorageService.getUserId() } : null,
  isLoggedIn: localStorageService.getAccessToken() ? true : false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    recived(state, action) {
      //console.log('usersSlice', action);
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequested(state) {
      state.isLoading = true;
    },
    usersRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    authRequestSuccess(state, action) {
      state.auth = { ...action.payload };
      state.isLoggedIn = true;
    },
    userCreated(state, action) {
      state.entities.push(action.payload);
    },
    userLogout(state) {
      state.entities = [];
      state.isLoggedIn = false;
      state.auth = null;
      state.isLoading = true;
    },
    userUpdated(state, action) {
      console.log('userUpdated', action.payload);
      state.entities = state.entities.map((u) => {
        if (u._id === action.payload._id) {
          console.log('userUpdated', u._id);
          u = { ...u, ...action.payload };
        }
        return u;
      });
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;

const {
  recived,
  userUpdated,
  userLogout,
  usersRequested,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
} = actions;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// просто actions без обработки и payload в отличие от reducers в createSlice выше
const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const userCreateFailed = createAction('users/userCreateFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');

const createUser = (data) => async (dispatch) => {
  try {
    dispatch(userCreateRequested());
    const { content } = await userService.add(data);
    dispatch(userCreated(content));
  } catch (err) {
    dispatch(userCreateFailed());
  }
};

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });

      localStorageService.setTokens(data);

      dispatch(authRequestSuccess({ userId: data.localId }));

      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(0, 10),
          completedMeetings: randomInt(0, 100),
          ...rest,
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const updateUser = (id: string, data: any) => async (dispatch) => {
  try {
    dispatch(userUpdateRequested());
    const { content } = await userService.update(id, data);
    dispatch(userUpdated(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });

      localStorageService.setTokens(data);

      dispatch(authRequestSuccess({ userId: data.localId }));
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const logout = () => async (dispatch) => {
  localStorageService.clearTokens();
  const history = useHistory();
  dispatch(userLogout());
  // setUser(null);
  history.push('/');
};

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.fetchAll();
    dispatch(recived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLastFetch = () => (state) => state.users.lastFetch;
export const getUserById = (id) => (state) => state.users.entities.find((el) => el._id === id);
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserInfo = () => (state) => {
  if (!state.users.entities) return null;
  return state.users.entities.find((u) => u._id == state.users.auth.userId);
};

export default usersReducer;
