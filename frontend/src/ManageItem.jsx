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
    <div className="h-screen w-auto 0 z-0 bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-300 opacity-50">
          <p className="text-lg">Loading...</p>
        </div>
      )}
      <div className="ml-[100px] flex flex-wrap gap-2 align-center justify-center">
        {items ? (
          items.map((el) => (
            <ManageItemComponents
              key={el.id}
              title={el.title}
              image={el.thumbnail}
              id={el.id}
              description={el.description}
              created_at={el.created_at}
              rest_name={restaurant.restaurant.name}
              logo={restaurant.restaurant.profile_picture}
            />
          ))
        ) : (
          <p className="text-lg">No items yet</p>
        )}
      </div>
      );
    </div>
  );
};

export default ManageItem;
