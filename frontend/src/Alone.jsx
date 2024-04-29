import React, { useEffect } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";

const Alone = () => {
  const { setRestaurant, restaurant, User, setUser } = useStateContext();
  useEffect(() => {
    axiosClient
      .get("/user")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
};
export default Alone;
