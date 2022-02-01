import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children }) =>  {
  console.log(localStorage.getItem("user"))
  return localStorage.getItem("user") ? children : <Navigate to="/login" />
}

export default PrivateRoute;