import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Auth from "./Components/Auth";

const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState({ name: "Ahmed Habeila" });

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
