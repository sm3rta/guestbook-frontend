import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import CircularLoading from "../../../common/CircularLoading";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
console.log("process.env", process.env);

const Messages = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyValues, setReplyValues] = useState({});

  const getMessages = useCallback(() => {
    setError(false);
    setLoading(true);
    axios
      .get(apiEndpoint + "messages")
      .then((res) => {
        console.log("get messages res", res);
        setMessages(res.data.data.messages);
        setError(false);
      })
      .catch((error) => {
        console.log("get messages error", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div className="root">
      {!loading ? (
        !error ? (
          // finished loading and fetched data successfully
          messages.length > 0 ? (
            // there are messages
            <div className="messagesContainer">
              {messages.map((message, messageIdx) => (
                <div key={messageIdx} className="message">
                  <p className="message-submitter">
                    {message.submittedBy.name}
                  </p>
                  <p className="message-content">{message.content}</p>
                  <p className="message-date">
                    {moment(message.date).fromNow()}
                  </p>
                  <div className="new-reply-container">
                    <form
                      className="new-reply-form"
                      onSubmit={(event) => {
                        event.preventDefault();
                        // submitReply(messageIdx);
                      }}
                    >
                      <input
                        className="new-reply-input"
                        placeholder="Write a reply..."
                        value={replyValues[messageIdx].value}
                        disabled={replyValues[messageIdx].loading}
                        onChange={(event) => {
                          setReplyValues({
                            ...replyValues,
                            [messageIdx]: {
                              value: event.target.value,
                              loading: false,
                            },
                          });
                        }}
                      ></input>
                    </form>
                  </div>
                  <div className="replies">
                    {message.replies.map((reply) => (
                      <div key={reply._id} className="reply-container">
                        <p className="reply-submitter">
                          {reply.submittedBy.name}
                        </p>
                        <p className="reply-content">{reply.content}</p>
                        <p className="reply-date">
                          {moment(reply.date).fromNow()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // there are no messages
            <div>
              <p>There are no messages</p>
              <p>Be the first to submit a message!</p>
            </div>
          )
        ) : (
          // finished loading data but an error occurred
          <div className="error-message-container">
            <p>An error occurred while loading messages, please try again</p>
            <button onClick={getMessages}></button>
          </div>
        )
      ) : (
        // loading
        <CircularLoading size={100} />
      )}
    </div>
  );
};
export default Messages;
