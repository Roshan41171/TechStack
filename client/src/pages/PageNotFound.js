import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={{ marginLeft: "40%", marginTop: "5%" }}>
      <h1>Page Not Found.</h1>
      <br />
      <h3>Go to the Home Page.</h3>
      <Link to="/">
        <h4>HomePage</h4>
      </Link>
    </div>
  );
};

export default PageNotFound;
