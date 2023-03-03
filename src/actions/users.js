export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_AUTH0_USER = 'ADD_AUTH0_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAuth0User(user) {
  return {
    type: ADD_AUTH0_USER,
    user,
  };
}
