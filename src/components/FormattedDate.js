import PropTypes from 'prop-types';

const FormattedDate = ({ timestamp }) => {
  function formatDate(ts) {
    const date = new Date(ts);
    return `${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`;
  }

  return <span>{formatDate(timestamp)}</span>;
};
FormattedDate.propTypes = {
  timestamp: PropTypes.number,
};
export default FormattedDate;
