import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersReceived(state, action) {
      const users = action.payload;
      return {
        ...state,
        ...users
      };
    },
    userQuestionAnswered(state, action) {
      const { qid, answer, authedUserID } = action.payload;
      return {
        ...state,
        [authedUserID]: {
          ...state[authedUserID],
          answers: {
            ...state[authedUserID].answers,
            [qid]: answer
          }
        }
      };
    },
    userQuestionAdded(state, action) {
      const question = action.payload;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat(question.id)
        }
      };
    },
    auth0UserAdded(state, action) {
      const user = action.payload;
      return {
        ...state,
        [user.id]: user
      };
    }
  }
});

export const { usersReceived, userQuestionAnswered, userQuestionAdded, auth0UserAdded } =
  usersSlice.actions;
export default usersSlice.reducer;
