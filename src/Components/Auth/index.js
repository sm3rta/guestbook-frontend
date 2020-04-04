/**
 * @module Auth
 */
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./index.css";
import PropTypes from "prop-types";

import Signup from "./Signup";
import Signin from "./Signin";
import RedirectToHomepage from "./RedirectToHomepage";

/**
 * @method
 * @desc this is a nested router, it redirects to the appropriate component page
 * (signin or signup) or redirects to the homepage if user is already logged in
 *
 * @requires Signup
 * @requires Signin
 * @requires RedirectToHomepage
 *
 * @param {Object} props Component props
 * @param {boolean} props.loggedIn whether there is a user currently logged in or not
 * @param {function} props.setUserData a function to set the user data object after receiving
 * user info from the server
 * @param {function} props.setLoggedIn a function to set logged in status to true after signing in
 * successfully
 *
 */

const Auth = (props) => {
  const { loggedIn, setLoggedIn, setUserData } = props;
  return loggedIn ? (
    <div className="auth-root">
      <div className="auth-container">
        <RedirectToHomepage />
      </div>
    </div>
  ) : (
    <div className="auth-root">
      <p className="text big">Welcome to the guestbook</p>
      <p className="text small">Please sign in or sign up</p>
      <div className="auth-container">
        <div className="form-container">
          <Switch>
            <Route
              path="/auth/sign-in"
              render={(props) => (
                <Signin
                  {...props}
                  setLoggedIn={setLoggedIn}
                  setUserData={setUserData}
                />
              )}
              exact
            />
            <Route
              path="/auth/sign-up"
              render={(props) => (
                <Signup
                  {...props}
                  setLoggedIn={setLoggedIn}
                  setUserData={setUserData}
                />
              )}
              exact
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

Auth.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default Auth;
