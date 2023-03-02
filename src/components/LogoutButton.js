import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleUserLogout } from '../actions/authedUser';

const LogoutButton = ({ dispatch }) => {
  const navigate = useNavigate();
  function handleClick(e) {
    dispatch(handleUserLogout());
    navigate('/');
  }
  return (
    <button className="link-btn btn-auth" onClick={handleClick}>
      Log Out
    </button>
  );
};

LogoutButton.propTypes = {
  dispatch: PropTypes.func,
};
export default connect()(LogoutButton);
