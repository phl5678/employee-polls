import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('testing _saveQuestion() in _DATA.js', () => {
  it('should resolve and return newly-added question with ID when the correct info is passed in', async () => {
    const question = { optionOneText: 'go out', optionTwoText: 'stay home', author: 'sarahedo' };
    const result = await _saveQuestion(question);
    expect(result.id).toBeDefined();
    expect(result.optionOne.text).toEqual(question.optionOneText);
    expect(result.optionTwo.text).toEqual(question.optionTwoText);
    expect(result.author).toEqual(question.author);
  });
  it('should reject with error when passed in empty string for option one', async () => {
    const question = { optionOneText: '', optionTwoText: 'stay home', author: 'sarahedo' };
    await expect(_saveQuestion(question)).rejects.toEqual(
      'Please provide valid option one text, option two text, and/or author'
    );
  });
  it('should reject with error when no optionOneTex is defined', async () => {
    const question = { optionTwoText: 'stay home', author: 'sarahedo' };
    await expect(_saveQuestion(question)).rejects.toEqual(
      'Please provide valid option one text, option two text, and/or author'
    );
  });
  it('should reject with error when passed in null author', async () => {
    const question = { optionOneText: 'go out', optionTwoText: 'stay home', author: null };
    await expect(_saveQuestion(question)).rejects.toEqual(
      'Please provide valid option one text, option two text, and/or author'
    );
  });
  it('should reject with error when option one and two are identical', async () => {
    const question = { optionOneText: 'go out', optionTwoText: 'go out', author: 'sarahedo' };
    await expect(_saveQuestion(question)).rejects.toEqual('Please provide two different options.');
  });
});

describe('testing _saveQuestionAnswer() in _DATA.js', () => {
  it('should resolve and return true when the correct info is passed in', async () => {
    const info = { authedUser: 'sarahedo', qid: 'xj352vofupe1dqz9emx13r', answer: 'optionOne' };
    const result = await _saveQuestionAnswer(info);
    expect(result).toEqual(true);
  });
  it('should reject with error when qid is empty', async () => {
    const info = { authedUser: 'sarahedo', qid: '', answer: 'optionOne' };
    await expect(_saveQuestionAnswer(info)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
  it('should reject with error when qid is undefined', async () => {
    const info = { authedUser: 'sarahedo', answer: 'optionOne' };
    await expect(_saveQuestionAnswer(info)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
  it('should reject with error when authedUser is null', async () => {
    const info = { authedUser: null, qid: 'xj352vofupe1dqz9emx13r', answer: 'optionOne' };
    await expect(_saveQuestionAnswer(info)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
  it('should reject with error when answer is empty string', async () => {
    const info = { authedUser: 'sarahedo', qid: 'xj352vofupe1dqz9emx13r', answer: '' };
    await expect(_saveQuestionAnswer(info)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
