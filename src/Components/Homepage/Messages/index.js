import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./index.css";
import CircularLoading from "../../../common/CircularLoading";
import moment from "moment";
console.log("moment", moment);

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
console.log("process.env", process.env);

const Messages = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyValues, setReplyValues] = useState({});

  useEffect(() => {
    console.log("replyValues", replyValues);
  }, [replyValues]);

  const { loggedIn, userData } = props;

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
        setReplyValues(replyValues);
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
    getMessages();
  }, [getMessages]);

  const submitReply = (messageIdx) => {
    const message = messages[messageIdx];
    const replyContent = replyValues[messageIdx].value;
    console.log("message", message);
    console.log("replyContent", replyContent);
    setReplyValues({
      ...replyValues,
      [messageIdx]: {
        value: replyContent,
        loading: true,
      },
    });

    axios
      .post(apiEndpoint + "replies", {
        content: replyContent,
        submittedBy: userData._id,
        messageId: message._id,
      })
      .then((res) => {
        console.log("post reply res", res);
        setReplyValues({
          ...replyValues,
          [messageIdx]: {
            value: "",
            loading: false,
          },
        });
        getMessages(false);
      })
      .catch((error) => {
        console.log("post reply error", error);
      });
  };

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
                        submitReply(messageIdx);
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
