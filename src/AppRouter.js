/**
 * @module AppRouter
 */
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Auth from "./Components/Auth";

/**
 * @method
 * @desc this is the main app router, renders the appropriate component
 * depending on the url
 * @requires Homepage
 * @requires Auth
 *
 */
const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <Homepage
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userData={userData}
            />
          )}
          exact
        />
        <Route
          path="/auth"
          render={(props) => (
            <Auth
              {...props}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUserData={setUserData}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
