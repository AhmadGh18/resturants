import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosClient from "./axiosClient";
import { useStateContext } from "./context/ContextProvider";
import Mainer from "./RestaurantDashboard/Mainer";
import TopInfo from "./RestaurantDashboard/TopInfo";

const AdminPage = () => {
  const { User, setUser, token } = useStateContext();
  const nav = useNavigate();
  if (!token) {
    nav("/newUser/login");
  }

  useEffect(() => {
    axiosClient
      .get("/user")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (User.has_restaurant == 0) {
      return nav("/newUser/login");
    }
  }, []);

  return (
    <div>
      <TopInfo />
      <Mainer />
    </div>
  );
};

export default AdminPage;
