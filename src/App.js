import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';
import NewQuestionPage from './pages/NewQuestionPage';
import LoadingBar from 'react-redux-loading-bar';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import CallbackPage from './pages/CallbackPage';
import AuthGuard from './components/AuthGuard';
import { handleInitialData } from './actions/shared';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

function App({ dispatch, authedUserID }) {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated || authedUserID !== null) {
      dispatch(handleInitialData(user));
    }
  }, [dispatch, authedUserID, isAuthenticated, user]);

  return (
    <div className="app">
      <LoadingBar className="loading" />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<AuthGuard component={<HomePage />} />} />
          <Route
            path="/question/:question_id"
            element={<AuthGuard component={<QuestionPage />} />}
          />
          <Route path="/add" element={<AuthGuard component={<NewQuestionPage />} />} />
          <Route path="/leaderboard" element={<AuthGuard component={<LeaderboardPage />} />} />
          <Route path="/profile" element={<AuthGuard component={<ProfilePage />} />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}
App.propTypes = {
  dispatch: PropTypes.func,
};
const mapStateToProps = ({ authedUserID }) => ({ authedUserID });
export default connect(mapStateToProps)(App);
