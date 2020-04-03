import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const AppBar = (props) => {
  const { loggedIn, userData, setLoggedIn } = props;

  return (
    <div className="app-bar">
      <div className="title-container">
        <h1 className="title">Guestbook</h1>
      </div>
      <div className="account-container">
        {loggedIn ? (
          <div className="dropdown">
            <span>{userData.name}</span>
            <div className="dropdown-content">
              <button
                className="drop-down-button"
                onClick={() => {
                  setLoggedIn(false);
                }}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/sign-in">
            <button className="sign-in-button">Sign in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppBar;
