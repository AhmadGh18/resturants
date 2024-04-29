import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { useStepperContext } from "@mui/material";
import { useStateContext } from "./context/ContextProvider";
import { FaHeart } from "react-icons/fa";

const UserSavedItems = () => {
  const { User } = useStateContext();
  const [savedItems, setSavedItems] = useState(null);
  const [issaved, setIsitemsaved] = useState(true);
  function unlike(id) {
    setIsitemsaved(false);

    axiosClient
      .delete(`/user/unlikeItem/${User.id}/${id}`)
      .then(() => {
        setIsitemsaved(false);
      })
      .catch((err) => {
        setIsitemsaved(true);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/getUserSavedItems", {
          params: { id: User.id },
        });
        setSavedItems(response.data.savedItems); // Assuming the response contains a key 'savedItems'
        console.log(response.data.savedItems);
      } catch (error) {
        console.error("Error fetching user saved items:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {savedItems ? (
        <div>
          {savedItems.map((el) => {
            return (
              <div
                key={el.id}
                className="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
              >
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                  <img
                    className="rounded-t-lg w-full h-40 object-cover"
                    src={`http://localhost:8000/storage/${el.item.thumbnail}`}
                    alt=""
                  />
                </div>
                <div className="p-6">
                  <p className="text-base text-black">{el.item.title}</p>
                  <div className="ml-3 p-2">
                    <FaHeart
                      // className="text-white"
                      onClick={() => unlike(el.item.id)}
                      style={{ color: issaved ? "red" : "white" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {UserSavedItems && UserSavedItems.length == 0 && (
        <div className="flex justify-center items-center h-screen">
          <p>No saved Items</p>
        </div>
      )}
    </div>
  );
};

export default UserSavedItems;
