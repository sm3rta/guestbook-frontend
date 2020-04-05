/**
 * @module Signin
 */
import React, { useState, useCallback } from "react";
import "./index.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CircularLoading from "../../../common/CircularLoading";
import PropTypes from "prop-types";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

/**
 * @method
 * @desc shows a sign in form
 * @see Auth
 * @requires CircularLoading
 *
 *
 * @param {Object} props Component props
 * @param {function} props.setUserData a function to set the user data object after receiving
 * user info from the server
 * @param {function} props.setLoggedIn a function to set logged in status to true after signing in
 * successfully
 *
 */
const Signin = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserData, setLoggedIn } = props;
  const history = useHistory();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setError("");
      if (formData.email.length === 0) {
        setError("Please enter your e-mail");
        return;
      }
      if (formData.password.length === 0) {
        setError("Please enter your password");
        return;
      }
      if (!formData.email.match(emailRegex)) {
        setError("Please enter a valid e-mail");
        return;
      }
      setLoading(true);
      axios
        .post(apiEndpoint + "users/signin", formData)
        .then((res) => {
          console.log("signin post res", res);
          console.log("signin post res.headers", res.headers);
          const userData = { ...res.data.data };
          userData.token = res.headers["x-auth-token"];
          setUserData(userData);
          setLoggedIn(true);
          localStorage.setItem("userData", JSON.stringify(userData));
          history.push("/");
        })
        .catch((err) => {
          err.response && console.log("signin post error", err.response.data);
          setError("Wrong e-mail or password");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [formData, history, setUserData, setLoggedIn]
  );

  const handleChange = (event) => {
    setError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="error-text">{error}</p>
      <p className="label-text">Email</p>
      <input
        onChange={handleChange}
        value={formData.email}
        className="text-input"
        label="email"
        name="email"
        disabled={loading}
      />
      <p className="label-text">Password</p>
      <input
        disabled={loading}
        onChange={handleChange}
        name="password"
        value={formData.password}
        className="text-input"
        label="password"
        type="password"
      />
      {loading ? (
        <CircularLoading size={30} />
      ) : (
        <button type="submit" className="sign-up-in-button">
          Sign in
        </button>
      )}
      <p className="sign-up-in-redirect">
        Don't have an account? <Link to="/auth/sign-up">Sign up</Link>
      </p>
    </form>
  );
};

Signin.propTypes = {
  setUserData: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default Signin;
