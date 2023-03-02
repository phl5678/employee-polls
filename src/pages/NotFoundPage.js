import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import PropTypes from 'prop-types';

const NotFoundPage = ({ authedUserID }) => {
  return (
    <div>
      {authedUserID !== null ? <NavBar /> : null}
      <h2 className="center">Page Not Found</h2>
    </div>
  );
};
NotFoundPage.propTypes = { authedUserID: PropTypes.string };
const mapStateToProps = ({ authedUserID }) => ({ authedUserID });
export default connect(mapStateToProps)(NotFoundPage);
