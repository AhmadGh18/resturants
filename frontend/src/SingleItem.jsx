import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "./axiosClient";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaPlus,
  FaShoppingBag,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import TestSwiper from "./SimilarSwiper";
import SimilarItems from "./SimilarItems";
import ExploreRestaurants from "./ExploreRestaurants";
const SingleItem = () => {
  const { id } = useParams();
  const [cartItem, setCartItem] = useState(null);
  const [count, setcount] = useState(1);
  const [formdata, setFormData] = useState({
    item_id: id,
    count: 0,
  });
  const [cartsize, setcartsize] = useState(null);

  const [item, setItem] = useState(null);
  useEffect(() => {
    axiosClient.get(`/items/${id}`).then((response) => {
      setItem(response.data);
      console.log(response.data);
    });
  }, []);
  useEffect(() => {
    const cartItems =
      JSON.parse(window.localStorage.getItem("Cart_items")) || [];
    setcartsize(cartItems.length);
  }, []);
  function addtocart(itemid, qnty) {
    // Get the existing cart items from local storage
    const cart = JSON.parse(window.localStorage.getItem("Cart_items")) || [];

    // Check if an item with the same ID already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item.item_id === itemid);

    // If item exists in the cart, do nothing
    if (existingItemIndex !== -1) {
      return;
    }

    // If item doesn't exist, add it to the cart
    cart.push({ item_id: itemid, qnty: qnty });

    window.localStorage.setItem("Cart_items", JSON.stringify(cart));
    const cartItems =
      JSON.parse(window.localStorage.getItem("Cart_items")) || [];
    setcartsize(cartItems.length);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setcount(parseInt(value)); // Update count state with parsed integer value
  };
  return (
    <div>
      <div className="antialiased">
        <div className="bg-white shadow-sm sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
            <div className="flex items-center justify-between md:justify-start">
              <button
                type="button"
                className="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center"
              >
                <svg
                  className="text-gray-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <a href="#" className="font-bold text-gray-700 text-2xl">
                Shop.
              </a>

              <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
                <a
                  href="#"
                  className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  Electronics
                </a>
                <a
                  href="#"
                  className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  Fashion
                </a>
                <a
                  href="#"
                  className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  Tools
                </a>
                <a
                  href="#"
                  className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  Books
                </a>
                <a
                  href="#"
                  className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  More
                </a>
              </div>

              {/* <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <input
                    type="search"
                    className="pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
                    placeholder="Search"
                    onChange={handleChange}
                  />
                  <svg
                    className="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <a
                  href="#"
                  className="flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner"
                >
                  <svg
                    className="h-6 w-6 leading-none text-gray-300 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="pl-1 text-gray-500 text-md">0</span>
                </a>

                <button
                  type="button"
                  className="hidden md:block w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex justify-center items-center"
                >
                  <img
                    src="https://avatars.dicebear.com/api/bottts/2.svg"
                    alt="bottts"
                    width="28"
                    height="28"
                    className="rounded-lg mx-auto"
                  />
                </button>
              </div> */}
            </div>

            <div className="relative md:hidden">
              <input
                type="search"
                className="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
                placeholder="Search"
              />

              <svg
                className="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <a href="#" className="hover:underline hover:text-gray-600">
                Home
              </a>
              <span>
                <svg
                  className="h-5 w-5 leading-none text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <a href="#" className="hover:underline hover:text-gray-600">
                Categories
              </a>
              <span>
                <svg
                  className="h-5 w-5 leading-none text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span>Headphones</span>
            </div>
          </div>
          {item && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div>
                    <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                      <div
                        className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{ height: "100%", width: "100%" }}
                          className="aaa"
                        >
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                              zIndex: -1,
                            }}
                            lazy={true}
                            pagination={{
                              clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                          >
                            <SwiperSlide>
                              <img
                                src={`http://localhost:8000/storage/${item.thumbnail}`}
                                loading="lazy"
                              />
                            </SwiperSlide>
                            {item &&
                              item.item.images.map((el) => {
                                return (
                                  <SwiperSlide key={el}>
                                    <img
                                      src={`http://localhost:8000/storage/${el.imgUrl}`}
                                      loading="lazy"
                                    />
                                  </SwiperSlide>
                                );
                              })}
                          </Swiper>
                        </div>
                      </div>
                    </div>

                    <div className="flex -mx-2 mb-4">
                      {/* <template x-for="i in 4">
                <div className="flex-1 px-2">
                  <button x-on:click="image = i" :className="{ 'ring-2 ring-indigo-300 ring-inset': image === i }" className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                    <span x-text="i" className="text-2xl"></span>
                  </button>
                </div>
              </template> */}
                    </div>
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                    {item.item.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Posted By:{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      {item.restaurant_name}
                    </a>
                  </p>
                  <div className="flex items-center space-x-4 my-4">
                    <div>
                      <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                        <span className="text-indigo-400 mr-1 mt-1">$</span>
                        <span className="font-bold text-indigo-600 text-3xl">
                          {item.item.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-green-500 text-xl font-semibold">
                        Category
                      </p>
                      <Link className="text-blue-400 text-sm">
                        {item.item.category}
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-500">
                    descreption : {"  "} {item.item.description}
                  </p>
                  <div className="flex py-4 space-x-4">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>Qnty</span>
                      <span>
                        <input
                          type="number"
                          min="1"
                          value={count} // Bind value to count state
                          onChange={handleChange} // Update count state onChange
                          style={{
                            width: "50px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                        />
                      </span>
                    </div>

                    <button
                      type="button"
                      className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                      onClick={() => addtocart(item.id, count)} // Pass item ID and count to addtocart function
                    >
                      Add to Cart
                    </button>
                  </div>
                  tags:{" "}
                  {item.item.tags.split(",").map((el, index) => (
                    <span
                      key={index}
                      style={{
                        color: "white",
                        backgroundColor: "gray",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        margin: "5px",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                    >
                      #{el.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {item && <SimilarItems category={item.item.category} />}
        {item && <ExploreRestaurants type={item.item.restaurant.type} />}

        <div className="cartelement">
          <Link to="/checkout">
            <FaShoppingBasket />
            {cartsize}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
