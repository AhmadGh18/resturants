import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import SideBar from "../SideBar";

const RestaurantDashboard = () => {
  const { User, restaurant, setRestaurant } = useStateContext();
  // useEffect(() => {
  //   const fetchRestaurantInfo = async () => {
  //     try {
  //       const response = await axiosClient.get(
  //         `/restaurant/getByUserId/${User.id}`
  //       );
  //       setRestaurant(response.data);
  //     } catch (error) {
  //       console.error("Error fetching restaurant information:", error);
  //     }
  //   };

  //   fetchRestaurantInfo();
  // }, [User.id]);
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default RestaurantDashboard;
