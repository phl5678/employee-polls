import React from 'react';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import QuestionsList from '../components/QuestionsList';

const ProfilePage = ({ authedUser }) => {
  return (
    <div>
      <NavBar />

      <div className="container center">
        <div className="profile">
          <img src={authedUser.avatarURL} alt="Profile" className="avatar" />
          <div className="user-info">
            <h3 className="user-name">{authedUser.name}</h3>
            <span className="user-id">{authedUser.id}</span>
          </div>
        </div>
        <QuestionsList title={'My Questions'} questionsIds={authedUser.questions.reverse()} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUserID }) => ({ authedUser: users[authedUserID] });
export default connect(mapStateToProps)(ProfilePage);
