import NavBar from '../components/NavBar';
import QuestionsList from '../components/QuestionsList';
import { connect } from 'react-redux';

const HomePage = ({ newQuestionsIds, doneQuestionsIds, isLoading }) => {
  return (
    <div>
      <NavBar />
      {isLoading ? null : (
        <div className="container">
          <QuestionsList title="New Questions" questionsIds={newQuestionsIds} />
          <QuestionsList title="Done" questionsIds={doneQuestionsIds} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUserID }) => {
  const questionsArray = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);

  let doneQuestionsIds = [],
    newQuestionsIds = [];
  questionsArray.map((question) => {
    if (
      question.optionOne.votes.includes(authedUserID) ||
      question.optionTwo.votes.includes(authedUserID)
    ) {
      doneQuestionsIds.push(question.id);
    } else {
      newQuestionsIds.push(question.id);
    }
    return question;
  });

  return {
    newQuestionsIds,
    doneQuestionsIds,
    isLoading: questions === {},
  };
};
export default connect(mapStateToProps)(HomePage);
