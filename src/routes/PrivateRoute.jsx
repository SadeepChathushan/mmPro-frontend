import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

const PrivateRoute = ({ allowedRoles }) => {
  const userRole = authService.getUserRole();

  if (!userRole) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; // Make sure to use the default export here
