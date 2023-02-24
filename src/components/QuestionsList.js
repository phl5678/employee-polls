import QuestionCard from './QuestionCard';
import { Link } from 'react-router-dom';

const QuestionsList = ({ title, questionsIds }) => {
  return (
    <div className="questions-list border-box center">
      <div className="list-title">
        <h3>{title}</h3>
      </div>
      {title.toLowerCase() !== 'done' && questionsIds.length === 0 ? (
        <p>
          {title.toLowerCase().includes('new') ? (
            <span>You've answered all questions. </span>
          ) : null}
          <Link to="/add" className="link-btn">
            {title.toLowerCase().includes('new') ? (
              <span>Create more &gt;&gt;</span>
            ) : (
              <span>Create your first question &gt;&gt;</span>
            )}
          </Link>
        </p>
      ) : (
        <ul>
          {questionsIds.map((qid) => (
            <QuestionCard key={qid} questionId={qid} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionsList;
