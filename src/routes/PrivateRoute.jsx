import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("USERROLE");

  console.log("PrivateRoute11 user:", userRole);
  // if (!user) {
  //   console.log("User is loading...");
  //   return <div>Loading...</div>;
  // }

  // if (!allowedRoles.includes(user.role)) {
  //   console.error(`Unauthorized role: ${user.role}`);
  //   return <Navigate to="/signin" replace />;
  // }

  return <Outlet />;
};

export default PrivateRoute;
