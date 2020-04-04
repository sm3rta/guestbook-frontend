import React from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import Signin from "./Signin";
import RedirectToHomepage from "./RedirectToHomepage";
import "./index.css";

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
export default Auth;
