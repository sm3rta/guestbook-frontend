import React from "react";
import "./index.css";

import AppBar from "./AppBar";
import WriteNewMessage from "./WriteNewMessage";
import Messages from "./Messages";

const Homepage = (props) => {
  const { loggedIn, setLoggedIn, userData } = props;
  return (
    <main className="root">
      <AppBar
        loggedIn={loggedIn}
        userData={userData}
        setLoggedIn={setLoggedIn}
      />
      <div className="container">
        <WriteNewMessage loggedIn={loggedIn} userData={userData} />
        <Messages loggedIn={loggedIn} userData={userData} />
      </div>
    </main>
  );
};

export default Homepage;
