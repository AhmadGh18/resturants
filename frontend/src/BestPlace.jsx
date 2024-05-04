import React, { useEffect, useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";

const BestPlace = () => {
  const { restaurant } = useStateContext();
  const [longandlat, setlongandlat] = useState();
  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/bestplacedOrders/${restaurant.restaurant.id}`)
        .then((response) => {
          setlongandlat(response.data);
        });
    }
  }, [restaurant]);
  return (
    <div>
      {longandlat && (
        <iframe
          height={500}
          width={500}
          src={`https://www.google.com/maps?q=${longandlat.latitude},${longandlat.longitude}&h1=es;z=14&output=embed`}
          title="Restaurant Location"
        ></iframe>
      )}
    </div>
  );
};

export default BestPlace;
