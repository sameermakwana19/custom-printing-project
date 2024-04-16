import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Not Found</h2>
      <div className="not-found-container">
        <h4>
          Click the link to go to <Link to="/">Homepage</Link>
        </h4>
      </div>
    </div>
  );
};

export default NotFound;
