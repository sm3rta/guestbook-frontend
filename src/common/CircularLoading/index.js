import React from "react";
import "./index.css";

const CircularLoading = (props) => {
  const { size } = props;
  return (
    <div style={{ width: size, height: size }} className="circular-loading" />
  );
};
export default CircularLoading;
