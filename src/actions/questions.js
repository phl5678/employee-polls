import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { addErrors } from './errors';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ qid, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

//info: { authedUser, qid, answer }
export function handleAnswerQuestion(info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .then((result) => result && dispatch(answerQuestion(info)))
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e);
        alert('The was an error saving the answer. Try again.');
      });
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, navigate) {
  return (dispatch, getState) => {
    const { authedUserID } = getState();

    dispatch(showLoading());
    return saveQuestion({
      author: authedUserID,
      optionOneText: optionOneText.trim(),
      optionTwoText: optionTwoText.trim(),
    })
      .then((question) => {
        dispatch(addQuestion(question));
        navigate(`/question/${question.id}`);
      })
      .catch((err) => {
        dispatch(addErrors([err]));
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
}
