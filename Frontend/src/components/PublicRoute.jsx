import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children; // allow login/signup if not logged in
};

export default PublicRoute;
