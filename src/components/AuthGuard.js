import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthGuard = ({ component, authedUserID, redirectTo }) => {
  const isAuthenticated = authedUserID !== null;
  const location = useLocation();
  redirectTo = location.pathname;
  return isAuthenticated ? component : <Navigate to={`/?redirect=${redirectTo}`} replace />;
};

AuthGuard.propTypes = {
  component: PropTypes.element,
  authedUserID: PropTypes.string,
  redirectTo: PropTypes.string,
};
const mapStateToProps = ({ authedUserID }) => ({ authedUserID });
export default connect(mapStateToProps)(AuthGuard);
