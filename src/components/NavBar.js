import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavBar = ({ authedUser }) => {
  return authedUser === undefined ? null : (
    <nav className="nav">
      <ul className="main-menu">
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>
            New
          </NavLink>
        </li>
      </ul>
      <ul className="profile-menu">
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'active profile-link' : 'profile-link')}
          >
            <img src={authedUser.avatarURL} width="30px" className="avatar" alt="Profile" />
            <div>{authedUser.name}</div>
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  authedUser: PropTypes.object,
};
const mapStateToProps = ({ users, authedUserID }) => ({ authedUser: users[authedUserID] });
export default connect(mapStateToProps)(NavBar);
