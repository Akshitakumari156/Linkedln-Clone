import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // check if user exists
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children; // if logged in, allow access
};

export default ProtectedRoute;
