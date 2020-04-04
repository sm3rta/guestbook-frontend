/**
 * @module AppBar
 */
import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * @method AppBar
 * @desc  Component for displaying the appBar, it displays the user's name or a button to sign in
 * @param {Object} props Component props
 * @param {boolean} props.loggedIn whether there is a user currently logged in or not
 * @param {Object}  props.userData an object containing user data
 * @param {string}  props.userData._id currently logged in user ID
 * @param {string}  props.userData.name currently logged in user's name
 * @param {function} props.setLoggedIn a function to set loggedIn status
 * to false when user logs out
 *
 * @see Homepage
 *
 * @example
 * return <AppBar loggedIn={false} userData={{}} setLoggedIn={function () {}} />;
 *
 */

const AppBar = (props) => {
  const { loggedIn, userData, setLoggedIn } = props;

  return (
    <div className="app-bar">
      <div className="title-container">
        <h1 className="title">Guestbook</h1>
      </div>
      <div className="account-container">
        {loggedIn ? (
          <>
            <span>{userData.name}</span>

            <i
              onClick={() => {
                setLoggedIn(false);
              }}
              className="material-icons icon"
              title="Log out"
            >
              exit_to_app
            </i>
          </>
        ) : (
          <Link to="/auth/sign-in">
            <button className="sign-in-button">Sign in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

AppBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default AppBar;
