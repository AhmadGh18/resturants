import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";

const RestaurantPage = () => {
  const { User, token, setRestaurant } = useStateContext();

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await axiosClient.get(
          `/restaurant/getByUserId/${User.id}`
        );
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant information:", error);
      }
    };

    fetchRestaurantInfo();
  }, [User.id]);
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
