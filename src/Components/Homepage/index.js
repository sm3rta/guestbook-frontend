import React from "react";
import AppBar from "./AppBar";

const Homepage = (props) => {
  const { loggedIn, setLoggedIn, userData } = props;
  return (
    <div>
      <AppBar
        loggedIn={loggedIn}
        userData={userData}
        setLoggedIn={setLoggedIn}
      />
    </div>
  );
};

export default Homepage;
