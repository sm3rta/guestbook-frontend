import React, { useState } from "react";
import "./index.css";

import AppBar from "./AppBar";
import WriteNewMessage from "./WriteNewMessage";
import Messages from "./Messages";

const Homepage = (props) => {
  const { loggedIn, setLoggedIn, userData } = props;
  const [messagesRefresh, setMessagesRefresh] = useState(false);

  return (
    <main className="root">
      <AppBar
        loggedIn={loggedIn}
        userData={userData}
        setLoggedIn={setLoggedIn}
      />
      <div className="container">
        <WriteNewMessage
          loggedIn={loggedIn}
          userData={userData}
          setMessagesRefresh={setMessagesRefresh}
        />
        <Messages
          loggedIn={loggedIn}
          userData={userData}
          messagesRefresh={messagesRefresh}
          setMessagesRefresh={setMessagesRefresh}
        />
      </div>
    </main>
  );
};

export default Homepage;
