import NavBar from '../components/NavBar';
import { connect } from 'react-redux';

const LeaderboardPage = ({ sortedUsers, authedUserID, ranks }) => {
  return (
    <div>
      <NavBar />
      <div className="container center">
        <h3>Leaderboard</h3>
        <table className="leaderboard">
          <thead>
            <tr className="header">
              <th className="rank">Rank</th>
              <th className="users">Users</th>
              <th className="answered">Answered</th>
              <th className="created">Created</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.id} className={authedUserID === user.id ? 'row selected' : 'row'}>
                <td className="rank">{ranks[index]}</td>
                <td className="users">
                  <div className="flex-box">
                    <div>
                      <img src={user.avatarURL} className="avatar" width="50px" alt={user.name} />
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-id">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="answered">{Object.keys(user.answers).length}</td>
                <td className="created">{user.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUserID }) => {
  const sortedUsers = Object.values(users).sort((a, b) => {
    return (
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers).length + a.questions.length)
    );
  });

  const ranks = [];
  for (let index = 0; index < sortedUsers.length; index++) {
    const user = sortedUsers[index];
    if (index === 0) {
      ranks.push(index + 1);
      continue;
    }
    const count = Object.keys(user.answers).length + user.questions.length;
    const prev_count =
      Object.keys(sortedUsers[index - 1].answers).length + sortedUsers[index - 1].questions.length;
    if (count === prev_count) {
      ranks.push(ranks[index - 1]);
    } else {
      ranks.push(index + 1);
    }
  }
  return { sortedUsers, authedUserID, ranks };
};
export default connect(mapStateToProps)(LeaderboardPage);
