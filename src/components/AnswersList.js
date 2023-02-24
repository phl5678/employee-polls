import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';

const AnswersList = ({ dispatch, authedUser, question }) => {
  function handleClick(option) {
    dispatch(handleAnswerQuestion({ authedUser, qid: question.id, answer: option }));
  }
  return (
    <ul>
      <li onClick={() => handleClick('optionOne')} className="btn optionOne">
        <div>{question.optionOne.text}</div>
      </li>
      <li className="li-or">
        <div className="text-or">OR</div>
      </li>
      <li onClick={() => handleClick('optionTwo')} className="btn optionTwo">
        <div>{question.optionTwo.text}</div>
      </li>
    </ul>
  );
};

export default connect()(AnswersList);
