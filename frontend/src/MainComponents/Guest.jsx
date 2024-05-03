import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const Guest = () => {
  const { token, User } = useStateContext();
  if (token) {
    return <Navigate to="/home" />;
  }
  console.log("from guest", User);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Guest;
