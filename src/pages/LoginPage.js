import { connect } from 'react-redux';
import { handleUserLogin } from '../actions/authedUser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorsList from '../components/ErrorsList';
import { resetErrors } from '../actions/errors';

const LoginPage = ({ dispatch, errors, authedUserID }) => {
  const navigate = useNavigate();
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');

  useEffect(() => {
    if (authedUserID !== null) {
      navigate('/home');
    }
  }, [authedUserID, navigate]);

  function handleChangeID(e) {
    if (errors.length > 0) dispatch(resetErrors());
    setID(e.target.value);
  }
  function handleChangePW(e) {
    if (errors.length > 0) dispatch(resetErrors());
    setPW(e.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (errors.length > 0) dispatch(resetErrors());
    dispatch(handleUserLogin(id, pw, navigate));
  }
  return (
    <div className="login center">
      <img src="./hero.png" width="300px" alt="Would You Rather" />
      <h3>Employee Polls</h3>
      <form onSubmit={handleSumbit}>
        <div>
          <input type="text" placeholder="id" onChange={handleChangeID} />
        </div>
        <div>
          <input type="password" placeholder="password" onChange={handleChangePW} />
        </div>
        <ErrorsList errors={errors} />
        <button type="submit" disabled={id === '' || pw === ''} className="btn">
          Log In
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = ({ errors, authedUserID }) => ({ errors, authedUserID });
export default connect(mapStateToProps)(LoginPage);
