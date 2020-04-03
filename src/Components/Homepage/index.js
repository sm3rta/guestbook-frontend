import React from "react";

import AppBar from "./AppBar";
import WriteNewMessage from "./WriteNewMessage";
import Messages from "./Messages";

const Homepage = (props) => {
  const { loggedIn, setLoggedIn, userData } = props;
  return (
    <div>
      <AppBar
        loggedIn={loggedIn}
        userData={userData}
        setLoggedIn={setLoggedIn}
      />
      <WriteNewMessage loggedIn={loggedIn} />
      <Messages loggedIn={loggedIn} />
    </div>
  );
};

export default Homepage;
