import React, { useState, useEffect } from "react";
import "./index.css";

const WriteNewMessage = (props) => {
  const [messageContent, setMessageContent] = useState("");
  const { loggedIn } = props;

  return loggedIn ? (
    <div className="write-new-message">
      <textarea
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        className="new-message-textarea"
        rows={5}
        cols={20}
      />
      <div className="button-container">
        <button className="post-message-button">Post Message</button>
      </div>
    </div>
  ) : (
    <p>You must be logged in to be able to post messages </p>
  );
};
export default WriteNewMessage;
