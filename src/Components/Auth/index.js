import React from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import Signin from "./Signin";
import RedirectToHomepage from "./RedirectToHomepage";

const Auth = (props) => {
  const { loggedIn, setLoggedIn, setUserData } = props;
  return loggedIn ? (
    <RedirectToHomepage />
  ) : (
    <Switch>
      <Route
        path="/auth/sign-in"
        render={(props) => <Signin {...props} setLoggedIn={setLoggedIn} />}
        exact
      />
      <Route
        path="/auth/sign-up"
        render={(props) => <Signup {...props} setLoggedIn={setLoggedIn} />}
        exact
      />
    </Switch>
  );
};
export default Auth;
