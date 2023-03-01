import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthGuard = ({ component, authedUserID, redirectTo }) => {
  const isAuthenticated = authedUserID !== null;
  const location = useLocation();
  redirectTo = location.pathname;
  return isAuthenticated ? component : <Navigate to={`/?redirect=${redirectTo}`} replace />;
};

const mapStateToProps = ({ authedUserID }) => ({ authedUserID });
export default connect(mapStateToProps)(AuthGuard);
