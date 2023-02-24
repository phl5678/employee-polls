import { ADD_ERRORS, RESET_ERRORS } from '../actions/errors';

export default function errors(state = [], action) {
  switch (action.type) {
    case ADD_ERRORS:
      return [...state, ...action.errors];
    case RESET_ERRORS:
      return [];
    default:
      return state;
  }
}
