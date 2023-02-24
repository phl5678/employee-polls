const FormattedDate = ({ timestamp }) => {
  function formatDate(ts) {
    const date = new Date(ts);
    return `${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`;
  }

  return <span>{formatDate(timestamp)}</span>;
};
export default FormattedDate;
