import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const initialState = { entities: [], isLoading: true, error: null, lastFetch: 0 };

const professionsSlice = createSlice({
  name: 'professions',
  initialState,
  reducers: {
    recived(state, action) {
      //console.log('professionsSlice', action);
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequested(state) {
      state.isLoading = true;
    },
    professionsRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: professionsReducer } = professionsSlice;

const { recived, professionsRequested, professionsRequestFailed } = actions;

function isOutDated(date) {
  return Date.now() - date > 10 * 60 * 1000;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  if (isOutDated(getState().professions.lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.fetchAll();
      dispatch(recived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLastFetch = () => (state) => state.professions.lastFetch;
export const getProfessionById = (id) => (state) => state.professions.entities.find((el) => el._id === id);
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

export default professionsReducer;
