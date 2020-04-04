import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const WriteNewMessage = (props) => {
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  const { loggedIn, userData } = props;

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
      .post(apiEndpoint + "messages", {
        content: messageContent,
        submittedBy: userData._id,
      })
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
        history.push("/?refresh=true");
      });
  }, [messageContent, userData._id, history]);

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
export default WriteNewMessage;
