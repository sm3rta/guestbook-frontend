import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./Components/AppBar";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <AppBar />
      </div>
      <div>
        <Switch>
          {/* <Route path="/" component={Homepage} exact />
          <Route path="/signin" component={Homepage} exact />
          <Route path="/signup" component={Homepage} exact /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
