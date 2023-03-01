const ErrorsList = ({ errors }) => {
  return errors.length === 0 ? null : (
    <div className="error" data-testid="errors-list">
      <ul>
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsList;
