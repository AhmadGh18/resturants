import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import SwiperElement from "./SwiperElement";
import { FaDog, FaEllipsisV } from "react-icons/fa";

const RestaurantMenu = () => {
  const { restaurant } = useStateContext();
  const [items, setItems] = useState(null);
  useEffect(() => {
    axiosClient.get(`/restaurants/${restaurant.id}/items`).then((data) => {
      setItems(data.data.items);
      // console.log(data.data.items);
    });
  }, []);

  return (
    <div className="holderitem">
      {items &&
        items.map((el) => {
          return (
            <div key={el} className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-cover bg-center h-56 p-4 bg33">
                      <div className="flex justify-end editfa">
                        <FaEllipsisV className="editfa" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                        Detached house • 5y old
                      </p>
                      <p className="text-3xl text-gray-900">$750,000</p>
                      <p className="text-gray-700">742 Evergreen Terrace</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantMenu;
