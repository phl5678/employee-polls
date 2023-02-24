export const ADD_ERRORS = 'ADD_ERRORS';
export const RESET_ERRORS = 'RESET_ERRORS';

export function addErrors(errors) {
  return {
    type: ADD_ERRORS,
    errors,
  };
}

export function resetErrors() {
  return {
    type: RESET_ERRORS,
  };
}
