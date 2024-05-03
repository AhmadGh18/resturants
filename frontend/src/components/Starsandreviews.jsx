import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { FaStar } from "react-icons/fa";
import Stars from "../Stars";

const Starsandreviews = () => {
  const { restaurant } = useStateContext();
  const [RestaurantFeedbacks, setRestaurantFeedbacks] = useState(null);
  const [loading, setislaoding] = useState(true);
  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/feedback/getAll/${restaurant.restaurant.id}`)

        .then((response) => {
          setislaoding(false);
          setRestaurantFeedbacks(response.data);
        });
    }
  }, [restaurant.restaurant]);
  return (
    <div className="ml-[100px] w-[80%] mt-10">
      {/* <Stars /> */}
      {RestaurantFeedbacks &&
        RestaurantFeedbacks.map((el) => (
          <article
            key={el.id}
            className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
          >
            <center>{loading && "loading..."}</center>
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  <p style={{ color: "gray" }}> {el.full_name}</p>
                </p>
              </div>

              <div
                id={`dropdownComment${el.id}`}
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                ></ul>
              </div>
            </footer>

            <p className="text-gray-500 dark:text-gray-400">
              {[...Array(el.stars)].map((_, index) => (
                <FaStar
                  key={index}
                  style={{
                    color: "gold",
                    cursor: "pointer",
                    display: "inline",
                    fontSize: "1rem",
                    marginRight: "0.25rem",
                  }}
                />
              ))}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{el.feedback}</p>

            <div className="flex items-center mt-4 space-x-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={el.created} title={el.created}>
                  {`${new Date(el.created_at).getFullYear()}-${(
                    new Date(el.created_at).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${new Date(el.created_at)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`}
                </time>
              </p>
            </div>

            <hr />
          </article>
        ))}
    </div>
  );
};

export default Starsandreviews;
