import { connect } from 'react-redux';
import { handleUserLogin } from '../actions/authedUser';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorsList from '../components/ErrorsList';
import { resetErrors } from '../actions/errors';

const LoginPage = ({ dispatch, errors, authedUserID }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');

  useEffect(() => {
    if (authedUserID !== null) {
      const redirect = searchParams.get('redirect');
      if (redirect !== null) {
        navigate(redirect);
      } else {
        navigate('/home');
      }
    }
  }, [authedUserID, navigate, searchParams]);

  function handleChangeID(e) {
    if (errors && errors.length > 0) dispatch(resetErrors());
    setID(e.target.value);
  }
  function handleChangePW(e) {
    if (errors && errors.length > 0) dispatch(resetErrors());
    setPW(e.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (errors && errors.length > 0) dispatch(resetErrors());
    dispatch(handleUserLogin(id, pw));
  }
  return (
    <div className="login center">
      <img src="./hero.png" width="300px" alt="Would You Rather" />
      <h3>Employee Polls</h3>
      <form onSubmit={handleSumbit} data-testid="login-form">
        <div>
          <input
            type="text"
            placeholder="id"
            onChange={handleChangeID}
            value={id}
            data-testid="id-input"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={pw}
            onChange={handleChangePW}
            data-testid="pw-input"
          />
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
