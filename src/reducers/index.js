import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import errors from './errors';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  authedUserID: authedUser,
  users,
  questions,
  errors,
  loadingBar: loadingBarReducer,
});
