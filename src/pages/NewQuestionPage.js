import { handleAddQuestion } from '../slices/questionsSlice';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { connect } from 'react-redux';
import ErrorsList from '../components/ErrorsList';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { errorsReset } from '../slices/errorsSlice';

const NewQuestionPage = ({ dispatch, errors }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  const handleChangeOne = (e) => {
    setOptionOne(e.target.value);
    if (errors.length > 0) dispatch(errorsReset());
  };
  const handleChangeTwo = (e) => {
    setOptionTwo(e.target.value);
    if (errors.length > 0) dispatch(errorsReset());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0) dispatch(errorsReset());
    dispatch(handleAddQuestion(optionOne, optionTwo)).then(() => {
      if (errors.length === 0) navigate('/home');
    });
  };

  const optionOneLeft = 280 - optionOne.length;
  const optionTwoLeft = 280 - optionTwo.length;
  return (
    <div>
      <NavBar />
      <div className="container center would-you-rather">
        <img src="./hero.png" width="200px" alt="Woud You Rather" />
        <form className="new-question" onSubmit={handleSubmit}>
          <ul>
            <li>
              <textarea
                type="text"
                placeholder="Option One"
                value={optionOne}
                onChange={handleChangeOne}
                className="textarea"
                rows="4"
                cols="30"
                minLength={3}
                maxLength={280}
              />
              {optionOneLeft <= 100 && (
                <div className="option-length">{optionOneLeft} characters left</div>
              )}
            </li>
            <li className="li-or">
              <div className="text-or">OR</div>
            </li>
            <li>
              <textarea
                type="text"
                placeholder="Option Two"
                value={optionTwo}
                onChange={handleChangeTwo}
                className="textarea"
                width="200px"
                rows="4"
                cols="30"
                minLength={3}
                maxLength={280}
              />
              {optionTwoLeft <= 100 && (
                <div className="option-length">{optionTwoLeft} characters left</div>
              )}
            </li>
          </ul>
          <ErrorsList errors={errors} />
          <button
            className="btn"
            type="submit"
            disabled={
              optionOne.length < 3 || optionTwo.length < 3 || optionOne.trim() === optionTwo.trim()
            }
          >
            Create New Poll
          </button>
        </form>
      </div>
    </div>
  );
};
NewQuestionPage.propTypes = {
  dispatch: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string)
};
const mapStateToProps = ({ errors }) => ({ errors });
export default connect(mapStateToProps)(NewQuestionPage);
