import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CircularLoading from "../../../../common/CircularLoading";
import moment from "moment";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const Message = (props) => {
  const [edit, setEdit] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMessageShown, setIsMessageShown] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [isReplyLoading, setIsReplyLoading] = useState(false);

  const { userData, message, loggedIn, getMessages } = props;

  // refresh edited message value with original value
  useEffect(() => {
    setEditedValue(message.content);
  }, [message.content]);

  const deleteMessage = useCallback(() => {
    const messageId = message._id;

    setLoading(true);
    axios
      .delete(apiEndpoint + `messages/${messageId}`)
      .then((res) => {
        setIsMessageShown(false);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [message._id]);

  const submitMessageChanges = useCallback(() => {
    const messageId = message._id;

    setLoading(true);
    axios
      .patch(apiEndpoint + `messages/${messageId}`, {
        content: editedValue,
      })
      .then((res) => {
        console.log("message patch res", res);
        setEdit((v) => !v);
        getMessages(false);
      })
      .catch((err) => {
        console.log("message patch error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [editedValue, getMessages, message._id]);

  const submitReply = useCallback(() => {
    setIsReplyLoading(true);
    axios
      .post(apiEndpoint + "replies", {
        content: replyContent,
        submittedBy: userData._id,
        messageId: message._id,
      })
      .then((res) => {
        console.log("post reply res", res);
        getMessages(false);
        setReplyContent("");
      })
      .catch((error) => {
        console.log("post reply error", error);
      })
      .finally(() => {
        setIsReplyLoading(false);
      });
  }, [getMessages, message._id, replyContent, userData._id]);

  return !loading ? (
    isMessageShown ? (
      <div className="message-container">
        <div className="message-info-container">
          <div className="message-submitter-content-date">
            <div className="message-info-container">
              <span className="message-submitter">
                {message.submittedBy.name}
              </span>
              {message.submittedBy._id === userData._id && loggedIn && (
                <span>
                  <i
                    onClick={() => {
                      setEdit(true);
                    }}
                    className="material-icons icon"
                    title="Edit message"
                  >
                    create
                  </i>
                  <i
                    onClick={() => deleteMessage(message._id)}
                    className="material-icons icon"
                    title="Delete message"
                  >
                    clear
                  </i>
                </span>
              )}
            </div>
            {edit ? (
              <div className="message-textarea-button-container">
                <textarea
                  className="new-message-textarea"
                  rows={3}
                  cols={20}
                  onChange={(event) => {
                    setEditedValue(event.target.value);
                  }}
                  value={editedValue}
                />
                <div className="message-edit-button-container">
                  <button
                    onClick={() => {
                      setEdit((v) => !v);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={submitMessageChanges}>Update</button>
                </div>
              </div>
            ) : (
              <p className="message-content">{message.content}</p>
            )}
            <p className="message-date">{moment(message.date).fromNow()}</p>
          </div>
        </div>
        <div className="new-reply-container">
          <form
            className="new-reply-form"
            onSubmit={(event) => {
              event.preventDefault();
              submitReply();
            }}
          >
            <input
              className="new-reply-input"
              placeholder={
                loggedIn ? "Write a reply..." : "Please login to reply"
              }
              value={replyContent}
              disabled={isReplyLoading || !loggedIn}
              onChange={(event) => {
                setReplyContent(event.target.value);
              }}
            ></input>
          </form>
        </div>
        <div className="replies">
          {message.replies.map((reply) => (
            <div key={reply._id} className="reply-container">
              <p className="reply-submitter">{reply.submittedBy.name}</p>
              <p className="reply-content">{reply.content}</p>
              <p className="reply-date">{moment(reply.date).fromNow()}</p>
            </div>
          ))}
        </div>
      </div>
    ) : null
  ) : (
    <CircularLoading size={40} />
  );
};
export default Message;
