import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
console.log("process.env", process.env);

const Messages = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMessages = useCallback(() => {
    setError(false);
    setLoading(true);
    axios
      .get(apiEndpoint + "messages")
      .then((res) => {
        console.log("res", res);
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

  return !loading ? (
    !error ? (
      // finished loading and fetched data successfully
      <div />
    ) : (
      // finished loading data but an error occurred
      <div />
    )
  ) : (
    // loading
    <div />
  );
};
export default Messages;
