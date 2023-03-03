import { getInitialData } from '../utils/api';
import { handleSetAuth0User } from './authedUserSlice';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { questionsReceived } from './questionsSlice';
import { usersReceived } from './usersSlice';

export function handleInitialData(user) {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      if (user !== undefined) {
        dispatch(handleSetAuth0User(user));
      }
      dispatch(usersReceived(users));
      dispatch(questionsReceived(questions));
      dispatch(hideLoading());
    });
  };
}
