import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { errorsAdded, errorsReset } from '../slices/errorsSlice';
import { auth0UserAdded } from './usersSlice';

const initialState = null;

export function handleUserLogin(id, password) {
  return (dispatch) => {
    dispatch(showLoading());
    return loginUser({ id, password })
      .then((result) => {
        if (result === true) {
          dispatch(authedUserIDSet(id));
        } else {
          dispatch(errorsAdded(['Password not matched.']));
        }
      })
      .catch(() => dispatch(errorsAdded(['No user found.'])))
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleUserLogout() {
  return (dispatch) => {
    dispatch(authedUserIDSet(null));
    dispatch(errorsReset());
  };
}

function formatUser({ email, name, nickname }) {
  return {
    id: nickname,
    password: email,
    name: name,
    avatarURL: '/avatar.svg',
    answers: {},
    questions: []
  };
}
export function handleSetAuth0User({ email, name, nickname }) {
  return (dispatch) => {
    const user = formatUser({ email, name, nickname });
    dispatch(authedUserIDSet(user.id));
    dispatch(auth0UserAdded(user));
  };
}

const authedUserSlice = createSlice({
  name: 'authedUserID',
  initialState,
  reducers: {
    authedUserIDSet(state, action) {
      return action.payload;
    }
  }
});

export const { authedUserIDSet } = authedUserSlice.actions;
export default authedUserSlice.reducer;
