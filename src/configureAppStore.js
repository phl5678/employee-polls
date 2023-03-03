import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import authedUserID from './slices/authedUserSlice';
import users from './slices/usersSlice';
import questions from './slices/questionsSlice';
import errors from './slices/errorsSlice';
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = {
  authedUserID,
  users,
  questions,
  errors,
  loadingBar: loadingBarReducer
};

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState
  });

  return store;
}
