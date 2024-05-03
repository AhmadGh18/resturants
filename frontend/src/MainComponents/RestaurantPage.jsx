import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import SideBar from "../SideBar";
import NewSide from "../RestaurantDashboard/NewSide";

const RestaurantPage = () => {
  const { User, token, setRestaurant, setUser } = useStateContext();
  if (User) {
    console.log(User);
  }
  useEffect(() => {
    axiosClient.get(`/restaurant/getByUserId/${User.id}`).then((res) => {
      console.log(res);
      setRestaurant(res.data);
    });
  }, [User]);

  return (
    <div>
      <div className="absolute">
        <NewSide />
      </div>

      <div className="bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantPage;
