import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { setAuthedUser } from '../actions/authedUser';

const AuthGuard = ({ dispatch, component, authedUserID }) => {
  const { isAuthenticated, user } = useAuth0();

  const isAuthed = isAuthenticated || authedUserID !== null;
  const location = useLocation();
  const redirectTo = location.pathname;

  useEffect(() => {
    if (isAuthenticated === true && authedUserID === null) {
      if (!user) {
        dispatch(setAuthedUser(user.email));
      }
    }
  });
  return isAuthed ? component : <Navigate to={`/?redirect=${redirectTo}`} replace />;
};

AuthGuard.propTypes = {
  component: PropTypes.element,
  authedUserID: PropTypes.string,
  redirectTo: PropTypes.string,
};
const mapStateToProps = ({ authedUserID }) => ({ authedUserID });
export default connect(mapStateToProps)(AuthGuard);
