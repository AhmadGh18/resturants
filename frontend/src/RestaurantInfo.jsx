import React, { useEffect } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";

const RestaurantInfo = () => {
  const { User, setRestaurant, restaurant } = useStateContext();

  useEffect(() => {
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
    <div className="restaurant-info-container">
      <img
        className="restaurant-image"
        src={`http://localhost:8000/storage/${restaurant.profile_picture}`}
        alt="Restaurant Image"
      />
      <div className="restaurant-details">
        <h1>{restaurant.name}</h1>
        <iframe
          className="map-iframe"
          src={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&h1=es;z=14&output=embed`}
          title="Restaurant Location"
        ></iframe>
        <div>
          <p>bio: {restaurant.bio ? restaurant.bio : "No Bio Yet"}</p>
          <p>Type: {restaurant.type}</p>
          <p>Phone Number: {restaurant.phoneNumber}</p>
          <p>City: {restaurant.city}</p>
          <h2>User Info</h2>
          <p>User Name: {User.full_name}</p>
          <p>User Phone: {User.user_phone}</p>
          <p>User Email: {User.email}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
