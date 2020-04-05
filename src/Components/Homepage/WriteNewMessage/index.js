/**
 * @module WriteNewMessage
 */
import React, { useState, useCallback } from "react";
import "./index.css";
import axios from "axios";
import PropTypes from "prop-types";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

/**
 * @method WriteNewMessage
 * @desc  Component for posting a new message
 * @param {Object} props Component props
 * @param {boolean} props.loggedIn whether there is a user currently logged in or not
 * @param {Object}  props.userData an object containing user data
 * @param {string}  props.userData._id currently logged in user ID
 * @param {string}  props.userData.name currently logged in user's name
 * @param {function} setMessagesRefresh a function to set a flag to true for
 * the {@link Messages} component to reload messages
 *
 * @see Messages
 * @see Homepage
 *
 * @example
 * return (
 *   <WriteNewMessage
 *     loggedIn={true}
 *     userData={{ name, _id }}
 *     setMessagesRefresh={() => {}}
 *   />
 * );
 *
 */

const WriteNewMessage = (props) => {
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loggedIn, userData, setMessagesRefresh } = props;
  const submitMessage = useCallback(() => {
    setLoading(true);
    setError("");
    if (messageContent.length === 0) {
      setError("You cannot leave the message empty!");
      setLoading(false);
      return;
    }
    if (messageContent.length < 3) {
      setError("Please type 3 letters or more");
      setLoading(false);
      return;
    }
    axios
      .post(
        apiEndpoint + "messages",
        {
          content: messageContent,
          submittedBy: userData._id,
        },
        {
          headers: { "x-auth-token": userData.token },
        }
      )
      .then((res) => {
        console.log("post message res", res);
        setError(false);
        setMessageContent("");
      })
      .catch((err) => {
        err.response && console.log("post message err", err.response.data);
        err.response &&
          err.response.data &&
          setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        setMessagesRefresh(true);
      });
  }, [messageContent, userData, setMessagesRefresh]);

  return (
    <div className="write-new-message">
      <textarea
        value={messageContent}
        onChange={(event) => {
          setError("");
          setMessageContent(event.target.value);
        }}
        className="new-message-textarea"
        rows={5}
        cols={20}
        placeholder={
          loggedIn ? "Write a message" : "You must log in to post messages"
        }
        disabled={!loggedIn || loading}
      />
      {loggedIn && (
        <div className="button-container">
          {<p className="error-text">{error}</p>}
          <button onClick={submitMessage} className="post-message-button">
            Post Message
          </button>
        </div>
      )}
    </div>
  );
};

WriteNewMessage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.object,
  setMessagesRefresh: PropTypes.func,
};

export default WriteNewMessage;
