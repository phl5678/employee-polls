import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleUserLogout } from '../actions/authedUser';

const LogoutButton = ({ dispatch }) => {
  const navigate = useNavigate();
  return (
    <button
      className="link-btn btn-auth"
      onClick={() => {
        dispatch(handleUserLogout());
        navigate('/');
      }}
    >
      Log Out
    </button>
  );
};

export default connect()(LogoutButton);
