import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";

const UserPage = () => {
  const { setUser, User } = useStateContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserLocation = () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        success,
        error,
        { timeout: 5000 } // Adjust timeout as needed
      );
    };

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (User && User.city === "not set") {
            updateUserLocation(latitude, longitude, data.city, User.id);
          }
        })
        .catch((error) => {
          console.error("Error fetching user location:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const error = (err) => {
      console.error("Error retrieving user location:", err.message);
      setLoading(false);
    };

    const updateUserLocation = (latitude, longitude, city, id) => {
      axiosClient
        .post("/user/updatelocation", {
          latitude,
          longitude,
          city,
          id,
        })
        .then((response) => {
          console.log("User location updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user location:", error);
        });
    };

    if (User && User.city === "not set") {
      fetchUserLocation();
    }

    return () => {
      // Cleanup if needed
    };
  }, [User]);

  return (
    <div>
      <p>kkkk</p>
      {User ? User.full_name : "Loading..."}
    </div>
  );
};

export default UserPage;
