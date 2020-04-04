/**
 * @module CircularLoading
 */
import React from "react";
import "./index.css";
import PropTypes from "prop-types";

/**
 * method
 * @desc shows a rotating loading icon
 *
 * @param {Object} props  Component props
 * @param {number} props.size loader width and height in pixels
 *
 * @see Signin
 * @see Signup
 * @see Messages
 * @see Message
 *
 */
const CircularLoading = (props) => {
  const { size } = props;
  return (
    <div style={{ width: size, height: size }} className="circular-loading" />
  );
};

CircularLoading.propTypes = {
  size: PropTypes.number.isRequired,
};

export default CircularLoading;
