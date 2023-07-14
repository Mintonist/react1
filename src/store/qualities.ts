import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const initialState = { entities: [], isLoading: true, error: null, lastFetch: 0 };

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState,
  reducers: {
    recived(state, action) {
      //console.log('qualitiesSlice.recived');
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequested(state) {
      // console.log('qualitiesSlice.qualitiesRequested');
      state.lastFetch = Date.now();
      state.isLoading = true;
    },
    qualitiesRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;

const { recived, qualitiesRequested, qualitiesRequestFailed } = actions;

function isOutDated(date) {
  console.log('isOutDated?', Date.now(), date, Date.now() - date > 10 * 60 * 1000);
  return Date.now() - date > 10 * 60 * 1000;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  if (isOutDated(getState().qualities.lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.fetchAll();
      dispatch(recived(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLastFetch = () => (state) => state.qualities.lastFetch;
export const getQualityById = (id) => (state) => state.qualities.entities.find((el) => el._id === id);
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;

export default qualitiesReducer;
