import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";

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
        {/* <Route path="/sign-in" component={"div"} exact />
        <Route path="/sign-up" component={"div"} exact /> */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
