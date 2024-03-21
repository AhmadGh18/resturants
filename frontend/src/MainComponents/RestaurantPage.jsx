import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const RestaurantPage = () => {
  const { User, token } = useStateContext();

  if (!token) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RestaurantPage;
