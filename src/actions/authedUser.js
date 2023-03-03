import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { loginUser } from '../utils/api';
import { addAuth0User } from './users';
import { addErrors, resetErrors } from './errors';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleUserLogin(id, password) {
  return (dispatch) => {
    dispatch(showLoading());
    return loginUser({ id, password })
      .then((result) => {
        if (result === true) {
          dispatch(setAuthedUser(id));
        } else {
          dispatch(addErrors(['Password not matched.']));
        }
      })
      .catch(() => dispatch(addErrors(['No user found.'])))
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleUserLogout() {
  return (dispatch) => {
    dispatch(setAuthedUser(null));
    dispatch(resetErrors());
  };
}
function formatUser({ email, name, nickname }) {
  return {
    id: nickname,
    password: email,
    name: name,
    avatarURL: '/avatar.svg',
    answers: {},
    questions: [],
  };
}
export function handleSetAuth0User({ email, name, nickname }) {
  return (dispatch) => {
    const user = formatUser({ email, name, nickname });
    dispatch(setAuthedUser(user.id));
    dispatch(addAuth0User(user));
  };
}
