import React from 'react';
import Auth from '../../state/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="ml-10 flex items-start">
          <li className="mx-1 flex items-start">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="mx-1 flex items-start">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row flex">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 flex justify-center">
      <h1>
        <Link to="/">Team Tasks</Link>
      </h1>

      <nav className="flex">{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
