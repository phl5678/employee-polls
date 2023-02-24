const ErrorsList = ({ errors }) => {
  return !errors ? null : (
    <div className="error">
      <ul>
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsList;
