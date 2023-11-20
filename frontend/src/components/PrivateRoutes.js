import React from "react";
// So outlet is basically what we want to return if we're logged in, if there's a user because it just
// will, it will put out whatever page or screen we're trying to load.If we're not logged in, then we're going to use the navigate component to basically just redirect us.

// find out if there's user, if there's a user info piece of the state.
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
