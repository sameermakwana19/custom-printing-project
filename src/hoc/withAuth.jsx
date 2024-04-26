import React, { useContext } from "react";
import { UserContext } from "../context/User/UserContext";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  function NewComponent(props) {
    const { user } = useContext(UserContext);

    return user ? <WrappedComponent {...props} /> : <Navigate to="/login" />;
  }

  return NewComponent;
};

export default withAuth;
