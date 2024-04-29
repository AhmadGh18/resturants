import React, { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import SideBar from "../SideBar";

const RestaurantPage = () => {
  const { User, token, setRestaurant, setUser } = useStateContext();
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
    const fetchRestaurantInfo = async () => {
      if (User) {
        try {
          const response = await axiosClient.get(
            `/restaurant/getByUserId/${User.id}`
          );
          setRestaurant(response.data);
        } catch (error) {
          console.error("Error fetching restaurant information:", error);
        }
      }
    };

    fetchRestaurantInfo();
  }, [User.id]);
  if (User.has_restaurant == 0) {
    return <Navigate to="/home" />;
  }
  if (!token) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default RestaurantPage;
