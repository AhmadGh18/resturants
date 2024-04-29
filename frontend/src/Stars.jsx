import React, { useEffect, useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";

const Stars = () => {
  const { restaurant, User, setUser, setRestaurant } = useStateContext();
  const [rating, setRating] = useState([]);

  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/getRatingwithperctetage/${restaurant.restaurant.id}`)
        .then((response) => {
          console.log(response.data);
          const formattedData = Object.keys(response.data).map((key) => ({
            stars: parseInt(key),
            percentage: response.data[key],
          }));
          setRating(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching rating:", error);
        });
    }
  }, [restaurant]);

  return (
    <div
      className="bg-white p-4 mt-5"
      style={{
        width: "800px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {rating.map((rate, index) => (
        <div className="flex items-center mt-4" key={index}>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {rate.stars} star
          </a>
          <div className="w-2/4 h-4 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-4 bg-yellow-300 rounded"
              style={{ width: `${rate.percentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {rate.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stars;
