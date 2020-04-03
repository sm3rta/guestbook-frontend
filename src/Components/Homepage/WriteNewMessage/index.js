import React, { useState, useEffect } from "react";
import "./index.css";

const WriteNewMessage = (props) => {
  const [messageContent, setMessageContent] = useState("");
  const { loggedIn, userData } = props;

  return (
    <div className="write-new-message">
      <textarea
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        className="new-message-textarea"
        rows={5}
        cols={20}
        placeholder={
          loggedIn ? "Write a message" : "You must log in to post messages"
        }
        disabled={!loggedIn}
      />
      {loggedIn && (
        <div className="button-container">
          <button className="post-message-button">Post Message</button>
        </div>
      )}
    </div>
  );
};
export default WriteNewMessage;
