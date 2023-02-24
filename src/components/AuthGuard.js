import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthGuard = ({ component, authedUserID }) => {
  const isAuthenticated = authedUserID !== null;
  return isAuthenticated ? component : <Navigate to="/" replace />;
};

const mapStateToProps = ({ authedUserID }) => ({ authedUserID });
export default connect(mapStateToProps)(AuthGuard);
