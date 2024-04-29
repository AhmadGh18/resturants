import React, { useEffect, useState } from "react";
import ManageItemComponents from "./ManageItemComponents";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";

const ManageItem = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const { restaurant } = useStateContext();

  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/restaurantsItems/${restaurant.restaurant.id}`)
        .then((res) => {
          setItems(res.data.items);
          setLoading(false);
        });
    }
  }, [restaurant]);

  return (
    <div className="relative h-screen">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-300 opacity-50">
          <p className="text-lg">Loading...</p>
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center h-full overflow-x-scroll">
        {items ? (
          items.map((el) => (
            <ManageItemComponents
              key={el.id}
              title={el.title}
              image={el.thumbnail}
              description={el.description}
              id={el.id}
            />
          ))
        ) : (
          <p className="text-lg">No items yet</p>
        )}
      </div>
    </div>
  );
};

export default ManageItem;
