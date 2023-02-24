const AnswerResult = ({ optionText, showOption, calcOption, userAnswer }) => {
  function calcPercentage(a, b) {
    return (100 * (a / (a + b))).toFixed(0);
  }
  return (
    <li className={`answered btn ${optionText}`}>
      <div>{showOption.text}</div>
      <div className="result">
        <div className="percentage">
          {calcPercentage(showOption.votes.length, calcOption.votes.length)}%
        </div>
        <div className="votes-count">( {showOption.votes.length} votes )</div>
      </div>
      {userAnswer === optionText && (
        <div className="checked">
          <img src="../checked.png" width="30px" className="avatar" alt="Checked mark" />
        </div>
      )}
    </li>
  );
};

export default AnswerResult;
