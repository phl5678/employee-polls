import PropTypes from 'prop-types';

const ErrorsList = ({ errors }) => {
  return errors && errors.length !== 0 ? (
    <div className="error" data-testid="errors-list">
      <ul>
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  ) : null;
};
ErrorsList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};
export default ErrorsList;
