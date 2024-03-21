import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";

const Default = () => {
  const { token, User, setUser } = useStateContext();

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

  // if (User) {
  //   console.log("user exist from a");
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
