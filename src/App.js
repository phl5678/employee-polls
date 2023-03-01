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
import AuthGuard from './components/AuthGuard';
import { handleInitialData } from './actions/shared';
import { useEffect } from 'react';

function App({ dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default connect()(App);
