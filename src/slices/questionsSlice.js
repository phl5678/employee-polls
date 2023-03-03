import { createSlice } from '@reduxjs/toolkit';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { errorsAdded } from './errorsSlice';
import { userQuestionAdded, userQuestionAnswered } from './usersSlice';

const initialState = {};

//info: { authedUserID, qid, answer }
export function handleAnswerQuestion(info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .then((result) => {
        if (result) {
          dispatch(questionAnswered(info));
          dispatch(userQuestionAnswered(info));
        }
      })
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e);
        alert('The was an error saving the answer. Try again.');
      });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUserID } = getState();

    dispatch(showLoading());
    return saveQuestion({
      author: authedUserID,
      optionOneText: optionOneText.trim(),
      optionTwoText: optionTwoText.trim()
    })
      .then((question) => {
        dispatch(questionAdded(question));
        dispatch(userQuestionAdded(question));
      })
      .catch((err) => {
        dispatch(errorsAdded([err]));
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    questionsReceived(state, action) {
      const questions = action.payload;
      return { ...state, ...questions };
    },
    questionAnswered(state, action) {
      const { qid, answer, authedUserID } = action.payload;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUserID])
          }
        }
      };
    },
    questionAdded(state, action) {
      const question = action.payload;
      return {
        ...state,
        [question.id]: question
      };
    }
  }
});

export const { questionsReceived, questionAnswered, questionAdded } = questionsSlice.actions;
export default questionsSlice.reducer;
