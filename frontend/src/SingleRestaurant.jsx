import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserNav from "./components/UserNav";
import "./homePage.css";
import { FaBookmark, FaHeart, FaStar, FaStarHalf } from "react-icons/fa";

import { useStateContext } from "./context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Itemss from "./Itemss";
import RestInfo from "./RestInfo";

const SingleRestaurant = () => {
  const { User, token, setUser } = useStateContext();
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [savedItems, setSavedItems] = useState({});
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedbackInfo, setFeedbackInfo] = useState({
    feedback: "",
    stars: 0,
  });
  const [isSaved, setisSaved] = useState(false);
  const [isdisable, setisdisable] = useState(true);
  const [RestaurantFeedbacks, setRestaurantFeedbacks] = useState(null);
  const [editMode, setEditMode] = useState(false); // Define editMode state variable
  const [rating, setRating] = useState(0);
  const [UserAlreadyFeedback, setUserAlreadyFeedback] = useState(null);

  const nav = useNavigate();
  const [ratingCount, setRatingCount] = useState(0);
  const { restaurantId } = useParams();
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/user")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (User.id) {
      axiosClient
        .get(`/user/getUserRatingOfRestaurant/${User.id}/${restaurantId}`)
        .then((response) => {
          setUserAlreadyFeedback(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user feedback:", error);
        });
    }
  }, [User.id, restaurantId]);

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/restaurantsItems/${restaurantId}`).then((response) => {
      setLoading(false);
      setRestaurant(response.data.restaurant);
      setItems(response.data.restaurant.items);
      setRating(response.data.averageRating);
      setRatingCount(response.data.ratingCount);
    });
  }, [restaurantId]);
  const handleStarClick = (starIndex) => {
    setisdisable(false);
    setStars(starIndex + 1);
    setFeedbackInfo((prevInfo) => ({ ...prevInfo, stars: starIndex + 1 }));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 255) {
      setFeedbackInfo((prevInfo) => ({ ...prevInfo, feedback: value }));
    }
  };
  function handleSaverestaurant() {
    if (!token || !User.id) {
      return nav("/newUser/login");
    }
    setisSaved(true);

    axiosClient
      .post("/saverestaurant", {
        restaurant_id: restaurantId,
        user_id: User.id,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => setisSaved(false));
  }
  useEffect(() => {
    if (User.id && !loading) {
      axiosClient
        .get(`/allsavedofuser/${User.id}/${restaurantId}`)
        .then((response) => {
          const result = response.data.result;
          if (result === 1) {
            setisSaved(true);
          } else {
            setisSaved(false); // Add this line to explicitly set isSaved to false if the restaurant is not saved
          }
        })
        .catch((error) => {
          console.error("Error checking saved restaurant:", error);
        });
    }
  }, [User.id, loading, restaurantId]);

  function handleunsaveresttaurant() {
    setisSaved(false);

    axiosClient
      .post(`/unsaveitem/${User.id}/${restaurantId}`)
      .then((data) => {})
      .catch((err) => {
        setisSaved(true);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!User.id) {
      return nav("/newUser/login");
    }
    e.target
      .querySelector('button[type="submit"]')
      .setAttribute("disabled", true);

    axiosClient
      .post("/feedback/create", {
        user_id: User.id,
        restaurant_id: restaurantId,
        stars: feedbackInfo.stars,
        feedback: feedbackInfo.feedback,
      })
      .then((response) => {
        const updatedFeedbacks = response.data;
        setRestaurantFeedbacks(updatedFeedbacks);
        setFeedbackInfo({ feedback: "", stars: 0 });
        // Hide the comment textarea and rating stars after submitting feedback
        setUserAlreadyFeedback(true);
        // Optionally, you can re-enable the form submission button here if needed
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Re-enable the form submission button in case of an error
        e.target
          .querySelector('button[type="submit"]')
          .removeAttribute("disabled");
      });
  };

  const characterCount = feedbackInfo.feedback.length;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5; // Display full stars

  const deleteComment = (id) => {
    axiosClient
      .delete(`/feedbacks/delete/${id}`)
      .then((response) => {
        // Filter out the deleted feedback from the state
        setRestaurantFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback.id !== id)
        );
        console.log("Feedback deleted successfully");
        setUserAlreadyFeedback(false);
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
      });
  };

  useEffect(() => {
    axiosClient.get(`/feedback/getAll/${restaurantId}`).then((response) => {
      console.log(response);
      setRestaurantFeedbacks(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <UserNav />
        {restaurant && (
          <RestInfo
            name={restaurant.name}
            city={restaurant.city}
            type={restaurant.type}
            phoneNumber={restaurant.phoneNumber}
            bio={restaurant.bio}
            profile_picture={restaurant.profile_picture}
            rating_count={ratingCount}
            average_rating={rating}
          />
        )}
        <div className="iframhold">
          <div className="resturantfrme">
            {restaurant && (
              <iframe
                className="map-iframe"
                src={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&h1=es;z=14&output=embed`}
                title="Restaurant Location"
              ></iframe>
            )}
          </div>
        </div>
        <center>
          <h1 className="lg:text-3xl mt-10">Restaurant Items</h1>
        </center>
        <div>
          <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            {loading ? (
              // Display loading indicator while data is being fetched
              <div>Loading...</div>
            ) : items.length === 0 ? (
              // Display "No item" message centered on the screen if there are no items
              <div className="flex items-center justify-center h-40">
                <div>This restaurant has No Item</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-10">
                {items.map((el) => (
                  <Itemss
                    key={el.id}
                    title={el.title}
                    price={el.price}
                    id={el.id}
                    // tags={el.tags}
                    thumbnail={el.thumbnail}
                    description={el.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div>
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-black">
                Reviews
              </h2>
            </div>
            <form className="mb-6" onSubmit={handleSubmit}>
              {!UserAlreadyFeedback && (
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="w-full p-2 text-sm text-black border border-gray-300 rounded focus:outline-none dark:text-white dark:placeholder-gray-400 text-black"
                    placeholder="Write a comment..."
                    value={feedbackInfo.feedback}
                    onChange={handleChange}
                    style={{ color: "black" }}
                  ></textarea>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          style={{
                            color: index < stars ? "gold" : "gray",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            marginLeft: "0.5rem",
                            display: "inline",
                          }}
                          onClick={() => handleStarClick(index)}
                        />
                      ))}
                    </div>
                    <button
                      disabled={isdisable}
                      type="submit"
                      className="inline-block px-4 py-2 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-black hover:text-white"
                    >
                      Post review
                    </button>
                  </div>
                  <span className="block text-sm text-gray-600 mt-2">
                    {characterCount}/255 characters
                  </span>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            {RestaurantFeedbacks && RestaurantFeedbacks.length == 0 && (
              <center>
                {" "}
                <p>No feedbacks yet</p>
              </center>
            )}
            {RestaurantFeedbacks &&
              // Reorder the feedbacks array to display comments by the current user on top
              [...RestaurantFeedbacks]
                .sort((a, b) => (a.user_id === User.id ? -1 : 1))
                .map((el) => {
                  return (
                    <article
                      key={el.id}
                      className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                    >
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
                          id="dropdownComment1"
                          className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Remove
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Report
                              </a>
                            </li>
                          </ul>
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
                      <p className="text-gray-500 dark:text-gray-400">
                        {el.feedback}
                      </p>

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
                      {el.user_id == User.id && (
                        <button onClick={() => deleteComment(el.id)}>
                          x Remove
                        </button>
                      )}
                      <hr />
                    </article>
                  );
                })}
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleRestaurant;
