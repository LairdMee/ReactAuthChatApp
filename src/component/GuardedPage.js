import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const GuardedPage = ({ children }) => {
  const { user } = useAuth();
  // if (user === null) { // not logged in
  //   return <Navigate to='/login' />
  // }
  // // logged in
  // return children;
  return user ? children : <Navigate to="/login" />;
};

export default GuardedPage;
