import { ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions';
import { RECEIVE_USERS, ADD_AUTH0_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat(action.question.id),
        },
      };
    case ADD_AUTH0_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    default:
      return state;
  }
}
