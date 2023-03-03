import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAnswerQuestion } from '../slices/questionsSlice';

const AnswersList = ({ dispatch, authedUserID, question }) => {
  function handleClick(option) {
    dispatch(handleAnswerQuestion({ authedUserID, qid: question.id, answer: option }));
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
AnswersList.propTypes = {
  dispatch: PropTypes.func,
  authedUser: PropTypes.string,
  question: PropTypes.object
};
export default connect()(AnswersList);
