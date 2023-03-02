import PropTypes from 'prop-types';
import AnswerResult from './AnswerResult';

const AnswersListResult = ({ authedUserAnswer, question }) => {
  return (
    <ul>
      <AnswerResult
        optionText={'optionOne'}
        showOption={question.optionOne}
        calcOption={question.optionTwo}
        userAnswer={authedUserAnswer}
      />
      <li className="li-or">
        <div className="text-or">OR</div>
      </li>
      <AnswerResult
        optionText={'optionTwo'}
        showOption={question.optionTwo}
        calcOption={question.optionOne}
        userAnswer={authedUserAnswer}
      />
    </ul>
  );
};
AnswersListResult.propTypes = {
  authedUserAnswer: PropTypes.string,
  question: PropTypes.object,
};
export default AnswersListResult;
