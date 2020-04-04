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
          <>
            <span>{userData.name}</span>

            <i
              onClick={() => {
                setLoggedIn(false);
              }}
              className="material-icons icon"
              title="Log out"
            >
              exit_to_app
            </i>
          </>
        ) : (
          <Link to="/auth/sign-in">
            <button className="sign-in-button">Sign in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppBar;
