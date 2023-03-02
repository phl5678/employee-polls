import { useState } from 'react';
import NavBar from '../components/NavBar';
import QuestionsList from '../components/QuestionsList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HomePage = ({ newQuestionsIds, doneQuestionsIds, isLoading }) => {
  const [toggle, setToggle] = useState(true);
  function handleToggle(e) {
    setToggle(!toggle);
  }
  return (
    <div>
      <NavBar />
      {isLoading ? null : (
        <div className="container">
          <div className="toggle">
            <div>
              <label>
                <input
                  type="radio"
                  value={true}
                  name="toggle"
                  checked={toggle}
                  onChange={handleToggle}
                />
                <span>New Questions</span>
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value={false} name="toggle" onChange={handleToggle} />
                <span>Done Questions</span>
              </label>
            </div>
          </div>
          {toggle ? (
            <QuestionsList title="New Questions" questionsIds={newQuestionsIds} />
          ) : (
            <QuestionsList title="Done" questionsIds={doneQuestionsIds} />
          )}
        </div>
      )}
    </div>
  );
};
HomePage.propTypes = {
  newQuestionsIds: PropTypes.arrayOf(PropTypes.string),
  doneQuestionsIds: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
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
