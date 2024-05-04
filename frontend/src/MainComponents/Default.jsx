import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

const Default = () => {
  const { token, User, setUser } = useStateContext();

  const nav = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setUser]);
  if (User.has_restaurant == 0) {
    return nav("/home");
  }
  // if (User) {
  //   if (User.has_restaurant == 1) {
  //     return <Navigate to="/main/restaurant" />;
  //   }
  //   if (User.has_restaurant == 0) {
  //     return <Navigate to="/main/userPage" />;
  //   } else {
  //     return;
  //   }
  // }
  if (!token) {
    return <Navigate to="/newUser/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Default;
