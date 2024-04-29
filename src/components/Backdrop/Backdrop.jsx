import React from "react";

const Backdrop = ({ message = "Loading" }) => {
  return <div className="auth-backdrop">{message} ... </div>;
};

export default Backdrop;
