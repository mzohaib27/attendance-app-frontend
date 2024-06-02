import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1> Oops! PageNotFound</h1>
      <Link to={"/"}>
        <h1 className="hover-effect cursor-pointer">Go to Home Page</h1>
      </Link>
    </div>
  );
};

export default PageNotFound;
