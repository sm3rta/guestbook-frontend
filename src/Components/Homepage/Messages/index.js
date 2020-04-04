import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./index.css";
import CircularLoading from "../../../common/CircularLoading";
import moment from "moment";
import { useLocation } from "react-router-dom";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
console.log("process.env", process.env);

const Messages = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyValues, setReplyValues] = useState({});

  const location = useLocation();
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
        setMessages(res.data.data.messages);
        setReplyValues(replyValues);
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
    location.search === "?refresh=true" && getMessages();
  }, [location, getMessages]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const submitReply = useCallback(
    (messageIdx) => {
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
    },
    [getMessages, messages, replyValues, userData._id]
  );

  const deleteMessage = useCallback(
    (messageId) => {
      setLoading(true);
      axios
        .delete(apiEndpoint + `messages/${messageId}`)
        .then((res) => {
          getMessages();
        })
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {});
    },
    [getMessages]
  );

  return (
    <div className="messages-root">
      {!loading ? (
        !error ? (
          // finished loading and fetched data successfully
          messages.length > 0 ? (
            // there are messages
            <div className="messages-container">
              {messages.map((message, messageIdx) => (
                <div key={messageIdx} className="message-container">
                  <div className="message-info-container">
                    <div>
                      <p className="message-submitter">
                        {message.submittedBy.name}
                      </p>
                      <p className="message-content">{message.content}</p>
                      <p className="message-date">
                        {moment(message.date).fromNow()}
                      </p>
                    </div>

                    {message.submittedBy._id === userData._id && loggedIn && (
                      <i
                        onClick={() => deleteMessage(message._id)}
                        className="material-icons clear-icon"
                      >
                        clear
                      </i>
                    )}
                  </div>
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
                        placeholder={
                          loggedIn
                            ? "Write a reply..."
                            : "Please login to reply"
                        }
                        value={replyValues[messageIdx].value}
                        disabled={replyValues[messageIdx].loading || !loggedIn}
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
