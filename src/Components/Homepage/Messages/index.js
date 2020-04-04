import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./index.css";
import CircularLoading from "../../../common/CircularLoading";
import moment from "moment";
import Message from "./Message";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const Messages = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);

  const { loggedIn, userData, messagesRefresh, setMessagesRefresh } = props;

  const getMessages = useCallback((loading = true) => {
    setError(false);
    loading && setLoading(true);
    axios
      .get(apiEndpoint + "messages")
      .then((res) => {
        console.log("res", res);
        const replyValues = {};
        res.data.data.messages.forEach((_message, messageIdx) => {
          replyValues[messageIdx] = { value: "", loading: false };
        });

        setMessages(res.data.data.messages);

        setError(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    messagesRefresh && getMessages();
    setMessagesRefresh(false);
  }, [getMessages, setMessagesRefresh, messagesRefresh]);

  useEffect(() => {
    console.log("first effect triggered");
    getMessages();
  }, [getMessages]);

  return (
    <div className="messages-root">
      {!loading ? (
        !error ? (
          // finished loading and fetched data successfully
          messages.length > 0 ? (
            // there are messages
            <div className="messages-container">
              {messages.map((message, messageIdx) => (
                <Message
                  key={message._id}
                  message={message}
                  userData={userData}
                  loggedIn={loggedIn}
                  getMessages={getMessages}
                />
              ))}
            </div>
          ) : (
            // there are no messages
            <div className="error-message-container">
              <p>There are no messages</p>
              <p>Be the first to submit a message!</p>
            </div>
          )
        ) : (
          // finished loading data but an error occurred
          <div className="error-message-container">
            <p>An error occurred while loading messages, please try again</p>
            <button onClick={getMessages}>Reload</button>
          </div>
        )
      ) : (
        // loading
        <CircularLoading size={50} />
      )}
    </div>
  );
};
export default Messages;
