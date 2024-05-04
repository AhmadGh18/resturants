import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import SideBar from "../SideBar";
import NewSide from "../RestaurantDashboard/NewSide";

const RestaurantPage = () => {
  const { User, token, setRestaurant, setUser } = useStateContext();
  const nav = useNavigate();

  useEffect(() => {
    axiosClient.get(`/restaurant/getByUserId/${User.id}`).then((res) => {
      setRestaurant(res.data);
    });
  }, [User]);
  if (User.has_restaurant == 0) {
    return nav("/home");
  }
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
