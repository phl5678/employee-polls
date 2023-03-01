import { handleAddQuestion } from '../actions/questions';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { connect } from 'react-redux';
import ErrorsList from '../components/ErrorsList';
import { resetErrors } from '../actions/errors';
import { useNavigate } from 'react-router-dom';

const NewQuestionPage = ({ dispatch, errors }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  const handleChangeOne = (e) => {
    setOptionOne(e.target.value);
    if (errors.length > 0) dispatch(resetErrors());
  };
  const handleChangeTwo = (e) => {
    setOptionTwo(e.target.value);
    if (errors.length > 0) dispatch(resetErrors());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0) dispatch(resetErrors());
    dispatch(handleAddQuestion(optionOne, optionTwo)).then(() => {
      navigate('/home');
    });
  };

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
              />
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
              />
            </li>
          </ul>
          <ErrorsList errors={errors} />
          <button className="btn" type="submit" disabled={optionOne === '' || optionTwo === ''}>
            Create New Poll
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ errors }) => ({ errors });
export default connect(mapStateToProps)(NewQuestionPage);
