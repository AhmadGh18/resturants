import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { useStateContext } from "./context/ContextProvider";
import { FaHeart } from "react-icons/fa";

const UserSavedRestaurant = () => {
  const { User, setUser } = useStateContext();
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issaved, setisSaved] = useState(true);
  useEffect(() => {
    axiosClient
      .get("/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (User && User.id) {
      axiosClient
        .get("/userSavedRestaurants", { params: { id: User.id } })
        .then((response) => {
          setSavedRestaurants(response.data.savedRestaurants);
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching saved restaurants:", error);
          setLoading(false); // Set loading to false on error
        });
    }
  }, [User]); // Add User to dependency array
  function handleunsaveresttaurant(restaurantId) {
    setisSaved(false);

    axiosClient
      .post(`/unsaveitem/${User.id}/${restaurantId}`)
      .then((data) => {
        setisSaved(false);
      })
      .catch((err) => {
        console.error("Error unsaving restaurant:", err);
        setisSaved(true); // Set isSaved back to true if API call fails
      });
  }

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : savedRestaurants.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Saved Restaurants:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedRestaurants.map((savedRestaurant) => (
              <div
                key={savedRestaurant.id}
                className="border rounded-lg overflow-hidden"
              >
                <img
                  src={`http://localhost:8000/storage/${savedRestaurant.restaurant.profile_picture}`}
                  alt={savedRestaurant.restaurant.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold">
                    {savedRestaurant.restaurant.name}
                  </p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleunsaveresttaurant(savedRestaurant.restaurant.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>No saved restaurants</p>
        </div>
      )}
    </div>
  );
};

export default UserSavedRestaurant;
