import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import UserNav from "../components/UserNav";
import NearByRestaurant from "./NearByRestaurant";
import AllRestaurants from "./AllRestaurants";

const UserPage = () => {
  // const { setUser, User } = useStateContext();
  // const [loading, setLoading] = useState(false);
  // const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  // useEffect(() => {
  //   const fetchNearbyRestaurants = async (latitude, longitude) => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosClient.get(
  //         `/restaurant/getnearbyrestaurants?latitude=${latitude}&longitude=${longitude}`
  //       );
  //       setNearbyRestaurants(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching nearby restaurants:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (User && User.latitude && User.longitude) {
  //     fetchNearbyRestaurants(User.latitude, User.longitude);
  //   }
  // }, [User]);
  // useEffect(() => {
  //   const fetchUserLocation = () => {
  //     setLoading(true);
  //     navigator.geolocation.getCurrentPosition(
  //       success,
  //       error,
  //       { timeout: 5000 } // Adjust timeout as needed
  //     );
  //   };

  //   const success = (position) => {
  //     const { latitude, longitude } = position.coords;
  //     const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  //     fetch(geoApiUrl)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (User && User.city === "not set") {
  //           updateUserLocation(latitude, longitude, data.city, User.id);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user location:", error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  //   const error = (err) => {
  //     console.error("Error retrieving user location:", err.message);
  //     setLoading(false);
  //   };

  //   const updateUserLocation = (latitude, longitude, city, id) => {
  //     axiosClient
  //       .post("/user/updatelocation", {
  //         latitude,
  //         longitude,
  //         city,
  //         id,
  //       })
  //       .then((response) => {
  //         console.log("User location updated successfully:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error updating user location:", error);
  //       });
  //   };

  //   if (User && User.city === "not set") {
  //     fetchUserLocation();
  //   }

  //   return () => {
  //     // Cleanup if needed
  //   };
  // }, [User]);

  return (
    <div>
      <UserNav />
      <NearByRestaurant />
      <AllRestaurants />
    </div>
  );
};

export default UserPage;
