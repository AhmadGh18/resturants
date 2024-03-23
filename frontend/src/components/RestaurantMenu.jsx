import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";

const RestaurantMenu = () => {
  const { restaurant } = useStateContext();
  const [items, setItems] = useState(null);
  useEffect(() => {
    axiosClient.get(`/restaurants/${restaurant.id}/items`).then((data) => {
      setItems(data.data.items);
      console.log(data.data.items);
    });
  }, []);
  return (
    <div className="AllItem-restaurant">
      {items &&
        items.map((el) => {
          return (
            <div key={el} className="singleItem">
              <img src={`http://localhost:8000/storage/${el.thumbnail}`} />
              <p>{el.title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantMenu;
