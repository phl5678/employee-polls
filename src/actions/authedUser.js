import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { loginUser } from '../utils/api';
import { addErrors, resetErrors } from './errors';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleUserLogin(id, password, navigate) {
  return (dispatch) => {
    dispatch(showLoading());
    return loginUser({ id, password })
      .then((result) => {
        if (result === true) {
          dispatch(setAuthedUser(id));
          navigate('/home');
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
