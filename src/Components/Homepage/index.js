/**
 * @module Homepage
 */
import React, { useState } from "react";
import "./index.css";
import PropTypes from "prop-types";

import AppBar from "./AppBar";
import WriteNewMessage from "./WriteNewMessage";
import Messages from "./Messages";
/**
 * @method WriteNewMessage
 * @desc  Component for rendering an appbar, a field to post messages and show existing messages
 *
 * @requires AppBar
 * @requires WriteNewMessage
 * @requires Messages
 *
 *  loggedIn, setLoggedIn, userData
 * @param {Object} props Component props
 * @param {boolean} props.loggedIn whether there is a user currently logged in or not
 * @param {Object}  props.userData an object containing user data
 * @param {string}  props.userData._id currently logged in user ID
 * @param {string}  props.userData.name currently logged in user's name
 * @param {function} props.setLoggedIn a function to set loggedIn status
 * to false when user logs out
 *
 * @example
 * return <Homepage loggedIn={true} setLoggedIn={function () {}} userData={{}} />;
 *
 */

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

Homepage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default Homepage;
