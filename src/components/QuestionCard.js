import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormattedDate from './FormattedDate';

const QuestionCard = ({ question }) => {
  return question === null ? null : (
    <li className="border-box">
      <h4 className="title">{question.author}</h4>
      <p className="sub-title">
        <FormattedDate timestamp={question.timestamp} />
      </p>
      <Link to={`/question/${question.id}`} className="btn">
        Show
      </Link>
    </li>
  );
};
const mapStateToProps = ({ questions }, { questionId }) => ({
  question: questions[questionId],
});
export default connect(mapStateToProps)(QuestionCard);
