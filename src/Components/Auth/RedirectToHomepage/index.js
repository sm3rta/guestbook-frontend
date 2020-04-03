import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const RedirectToHomepage = (props) => {
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
