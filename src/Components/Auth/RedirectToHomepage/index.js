/**
 * @module RedirectToHomepage
 */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

/**
 * @method
 * @desc waits 2.5 seconds then redirects to the homepage\
 * this is done to prevent the user from accessing the signin/signup pages
 * while already logged in
 * @see Auth
 */
const RedirectToHomepage = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {redirect && <Redirect to="/"></Redirect>}
      <p>You're already logged in and you'll be redirected to the homepage</p>
    </div>
  );
};

export default RedirectToHomepage;
