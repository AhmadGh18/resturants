import React from "react";
import { FaHeart } from "react-icons/fa";

const RestaurantItemsCard = () => {
  return (
    <div className="w-64 h-64 bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition duration-200 ease-in-out">
      <div className="h-1/2 flex items-start justify-end rounded-t-xl bg-gradient-to-b from-red-500 to-indigo-400">
        <div className="transition duration-200 ease-in-out rounded-full bg-white w-8 h-8 flex items-center justify-center m-4 hover:scale-110 transform rotate-10">
          <FaHeart />
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between">
        <p className="font-semibold text-lg text-black">
          Meeting your Colleagues
        </p>
        <p className="text-sm text-gray-600">6 Video - 40 min</p>
      </div>
    </div>
  );
};

export default RestaurantItemsCard;
