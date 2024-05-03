import React, { useEffect, useState } from "react";
import { FaCartPlus, FaHeart, FaShoppingBasket } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import SimilarItems from "../SimilarItems";
import ExploreRestaurants from "../ExploreRestaurants";
import UserNav from "../components/UserNav";
import AllCartItems from "../AllCartItems";
import { colors } from "@mui/material";
import { useStateContext } from "../context/ContextProvider";

const SingleProductDetails = (props) => {
  const { id } = useParams();
  const [cartItem, setCartItem] = useState(null);
  const [count, setcount] = useState(1);
  const [formdata, setFormData] = useState({
    item_id: id,
    count: 0,
  });
  const { User, setUser } = useStateContext();

  const [restaurantId, setrestaurantId] = useState(null);
  const [cartsize, setcartsize] = useState(null);
  const [displaied, setisdiplaied] = useState(false);

  const [isItemSaved, setIsitemsaved] = useState(false);

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

  const saveItem = () => {
    setIsitemsaved(true);
    axiosClient
      .post("/user/likeitem", { user_id: User.id, item_id: id })
      .then(() => {
        setIsitemsaved(true);
      })
      .catch((err) => {
        setIsitemsaved(false);
      });
  };
  function unlike() {
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
  function toglledisplay() {
    setisdiplaied(!displaied);
  }
  useEffect(() => {
    if (User && User.id) {
      axiosClient.get(`/checkifItemissaved/${User.id}/${id}`).then((resp) => {
        if (resp.data.saved == 1) {
          setIsitemsaved(true);
        } else {
          setIsitemsaved(false);
        }
      });
    }
  }, [User.id, id]);
  useEffect(() => {
    axiosClient
      .get(`/getRestaurantbyproductId/${id}`)
      .then((response) => setrestaurantId(response.data.id));
  }, []);
  const [item, setItem] = useState(null);
  useEffect(() => {
    axiosClient.get(`/items/${id}`).then((response) => {
      setItem(response.data);
    });
  }, []);
  useEffect(() => {
    if (count < 1) {
      setcount(1);
    }
  }, [count]);
  useEffect(() => {
    const cartItems =
      JSON.parse(window.localStorage.getItem("Cart_items")) || [];
    setcartsize(cartItems.length);
  }, []);

  function addtocart(itemid, qnty) {
    const cart = JSON.parse(window.localStorage.getItem("Cart_items")) || [];

    // Check if an item with the same ID already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item.item_id === itemid);
    if (existingItemIndex !== -1) {
      return;
    }

    if (restaurantId) {
      cart.push({ item_id: itemid, qnty: qnty, restaurant_id: restaurantId });
    }

    window.localStorage.setItem("Cart_items", JSON.stringify(cart));
    const cartItems =
      JSON.parse(window.localStorage.getItem("Cart_items")) || [];
    setcartsize(cartItems.length);
  }
  return (
    <div className="allwarapper">
      <UserNav />

      {item ? (
        <main id="products" className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="producat_wrapper flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-14 w-full">
            <div className="producat_image w-full lg:w-1/2">
              <div className="img_thumbnail h-96">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  style={{ height: "100%" }}
                >
                  <SwiperSlide>
                    <img
                      src={`http://localhost:8000/storage/${item.item.thumbnail}`}
                      alt="not img"
                      className="rounded-lg cursor-pointer mx-auto  h-full w-full"
                      style={{ height: "100%" }}
                    />
                  </SwiperSlide>
                  {item.item.images.map((el) => {
                    return (
                      <SwiperSlide key={el.id}>
                        <img
                          src={`http://localhost:8000/storage/${el.imgUrl}`}
                          alt="not img"
                          className="rounded-lg cursor-pointer mx-auto  h-full w-full"
                          style={{ height: "100%" }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="producat_content w-full lg:w-1/2">
              <p className="company_txt text-orange-500 uppercase font-semibold tracking-wider text-sm">
                {item.item.restaurant_name}
              </p>
              <h2 className="text-2xl lg:text-4xl my-4">{item.item.title}</h2>
              <p className="producat_des text-base lg:text-lg leading-relaxed text-gray-600">
                {item.item.description}
              </p>
              <div className="price mt-4">
                <div className="dicscount_price flex items-center">
                  <p className="normal_price text-xl lg:text-2xl font-semibold">
                    ${item.item.price}
                  </p>
                </div>
              </div>
              <div className="mt-3">
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
              <div className="qty flex items-center mt-4 lg:mt-12">
                <div className="btns flex">
                  <button
                    type="button"
                    className="bg-lightgrayish text-blue-500 px-3 py-2 text-lg font-medium"
                    onClick={() => setcount((old) => old - 1)}
                  >
                    -
                  </button>
                  <button
                    type="input"
                    className="qty_numbers text-darkgrayish font-semibold mx-2"
                  >
                    {count}
                  </button>
                  <button
                    type="button"
                    className="bg-lightgrayish text-blue-500 px-3 py-2 text-lg font-medium"
                    onClick={() => setcount((old) => old + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addtocart(item.item.id, count)} // Pass item ID and count to addtocart function
                  className="add_cart bg-blue-500 text-white flex items-center justify-between px-6 py-1 rounded-md ml-4 cursor-pointer"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add to Cart
                </button>
                <div className="bg-blue-300 ml-3 p-2">
                  <FaHeart
                    // className="text-white"
                    onClick={isItemSaved ? unlike : saveItem}
                    style={{
                      color: isItemSaved ? "red" : "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="cartelement bg-blue-700" onClick={toglledisplay}>
            <FaShoppingBasket className="inline-block mr-2" />
            <span className=""> {cartsize}</span>
          </div>
          <AllCartItems
            display={displaied ? "block" : "none"}
            handleclickclose={() => setisdiplaied(false)}
            cartitems={JSON.parse(window.localStorage.getItem("Cart_items"))}
          />
        </main>
      ) : (
        <center>Loading...</center>
      )}
      {item && <SimilarItems category={item.item.category} />}
      {item && <ExploreRestaurants type={item.item.restaurant.type} />}
    </div>
  );
};

export default SingleProductDetails;
