import { createAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';

const initialState = { entities: [], isLoading: true, error: null };

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    recived(state, action) {
      console.log('commentsSlice', action);
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequested(state) {
      state.isLoading = true;
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated(state, action) {
      state.entities.push(action.payload);
    },
    commentRemoved(state, action) {
      state.entities = state.entities.filter((q) => q._id !== action.payload);
    },
  },
});

const { actions, reducer: commentsReducer } = commentsSlice;

const { recived, commentCreated, commentRemoved, commentsRequested, commentsRequestFailed } = actions;

const commentCreateRequested = createAction('users/commentCreateRequested');
const commentRemoveRequested = createAction('users/commentRemoveRequested');

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(pageId);
    dispatch(recived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const addComment = (userId, pageId, msg: string) => async (dispatch) => {
  try {
    dispatch(commentCreateRequested());
    const comment = { _id: nanoid(), userId, pageId, content: msg, created_at: Date.now() };
    const { content } = await commentService.add(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  try {
    dispatch(commentRemoveRequested());
    const { content } = await commentService.delete(id);
    //firebase при успешном удалении возвращает null
    dispatch(commentRemoved(id));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
