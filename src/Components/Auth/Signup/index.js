import React, { useState, useCallback } from "react";
import "./index.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CircularLoading from "../../../common/CircularLoading";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z1-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}/;

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const Signup = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserData, setLoggedIn } = props;
  const history = useHistory();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setError("");
      const { name, email, password, repeatPassword } = formData;
      //front-end validation
      if (name.length === 0) {
        setError("Please enter your name");
        return;
      }
      if (email.length === 0) {
        setError("Please enter your e-mail");
        return;
      }
      if (password.length === 0) {
        setError("Please enter a password");
        return;
      }
      if (repeatPassword.length === 0) {
        setError("Please re-enter the password");
        return;
      }
      if (!email.match(emailRegex)) {
        setError("Please enter a valid e-mail");
        return;
      }
      if (password.length < 8) {
        setError("Your password must be more than 8 characters long");
        return;
      }
      if (!password.match(passwordRegex)) {
        setError(
          "Your password must contain one uppercase character, a lowercase one and a special character"
        );
        return;
      }
      if (password !== repeatPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      axios
        .post(apiEndpoint + "users/signup", { name, email, password })
        .then((res) => {
          console.log("signup post res", res);
          setUserData(res.data.data);
          setLoggedIn(true);
          localStorage.setItem("loggedIn", JSON.stringify(true));
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          history.push("/");
        })
        .catch((err) => {
          err.response && console.log("signup post error", err.response.data);
          setError(err.response.data.message);
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

      {/* name */}
      <p className="label-text">Name</p>
      <input
        onChange={handleChange}
        value={formData.name}
        className="text-input"
        label="name"
        name="name"
        disabled={loading}
      />
      {/* email */}
      <p className="label-text">Email</p>
      <input
        onChange={handleChange}
        value={formData.email}
        className="text-input"
        label="email"
        name="email"
        disabled={loading}
      />
      {/* password */}
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
      {/* repeat password */}
      <p className="label-text">Repeat Password</p>
      <input
        disabled={loading}
        onChange={handleChange}
        name="repeatPassword"
        value={formData.repeatPassword}
        className="text-input"
        label="repeatPassword"
        type="password"
      />
      {loading ? (
        <CircularLoading size={30} />
      ) : (
        <button type="submit" className="sign-up-in-button">
          Sign up
        </button>
      )}
      <p className="sign-up-in-redirect">
        Already have an account? <Link to="/auth/sign-in">Sign in</Link>
      </p>
    </form>
  );
};

export default Signup;
