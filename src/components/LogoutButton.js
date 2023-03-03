import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleUserLogout } from '../slices/authedUserSlice';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = ({ dispatch }) => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth0();

  function handleClick(e) {
    if (isAuthenticated === true) {
      logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } else {
      dispatch(handleUserLogout());
      navigate('/');
    }
  }
  return (
    <button className="link-btn btn-auth" onClick={handleClick}>
      Log Out
    </button>
  );
};

LogoutButton.propTypes = {
  dispatch: PropTypes.func
};
export default connect()(LogoutButton);
