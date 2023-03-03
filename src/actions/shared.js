import { getInitialData } from '../utils/api';
import { handleSetAuth0User } from './authedUser';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function handleInitialData(user) {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      if (user !== undefined) {
        dispatch(handleSetAuth0User(user));
      }
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
