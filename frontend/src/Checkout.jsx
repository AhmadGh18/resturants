import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider";
import { FaArrowRight } from "react-icons/fa";
// import AddLocationAndSubmit from "./AddLocationAndSubmit";

const Checkout = () => {
  const [elements, setElements] = useState(null);
  const cartItems = JSON.parse(window.localStorage.getItem("Cart_items")) || [];
  const ids = cartItems.map((item) => item.item_id); // Extract item IDs
  const [subtotal, setSubtotal] = useState(0); // State for subtotal
  const { token } = useStateContext();
  const [infoToSubmit, setInfoToSubmit] = useState({
    first_name: "",
    last_name: "",
    phone_Number: "",
    Notes: "",
    longitude: "",
    latitude: "",
    city: "",
  });
  const [city, setCity] = useState();
  const [latitude, setLatitude] = useState(33.883346253230904);
  const [longitude, setLongitude] = useState(35.517484664916985);
  const nav = useNavigate();
  const fetchLocationInfo = async (lat, lng) => {
    try {
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch location information");
      }
      const data = await response.json();
      const city = data.city;
      setCity(city);
    } catch (error) {
      console.error("Error fetching location information:", error);
    }
  };

  useEffect(() => {
    if (window.jQuery) {
      // Load the locationpicker plugin
      import(
        "https://rawgit.com/Logicify/jquery-locationpicker-plugin/master/dist/locationpicker.jquery.js"
      )
        .then(async () => {
          $("#us2").locationpicker({
            location: {
              latitude,
              longitude,
            },
            radius: 0,
            enableAutocomplete: true,
            onchanged: function (currentLocation, radius, isMarkerDropped) {
              setLatitude(currentLocation.latitude);
              setLongitude(currentLocation.longitude);
              fetchLocationInfo(
                currentLocation.latitude,
                currentLocation.longitude
              );
            },
          });
        })
        .catch((error) => {
          console.error("Error loading locationpicker plugin:", error);
        });
    } else {
      console.error("jQuery is not available.");
    }
  }, []);

  const handleAcceptLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);

          if ($("#us2").locationpicker) {
            $("#us2").locationpicker("location", {
              latitude,
              longitude,
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await axiosClient.get("/CheckoutItems", {
          params: { ids: ids }, // Pass ids as query parameters
        });
        setElements(response.data);

        // Calculate subtotal
        const calculatedSubtotal = response.data.items.reduce(
          (acc, item) =>
            acc +
            item.price *
              (cartItems.find((cItem) => cItem.item_id === item.id)?.qnty || 0),
          0
        );
        setSubtotal(calculatedSubtotal);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    fetchElements();
  }, []);

  useEffect(() => {
    if (!token) {
      nav("/newUser/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoToSubmit((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleContinueClick = () => {
    // Scroll to the AddLocationAndSubmit component
    document.getElementById("addLocationAndSubmit").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="overflow-y-hidden">
        <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
          <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
            <div className="flex w-full  flex-col justify-start items-start">
              <div>
                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Check out
                </p>
              </div>
              <div className="mt-2">
                <a
                  href="javascript:void(0)"
                  className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
                >
                  Back to my bag
                </a>
              </div>
              <div className="mt-12">
                <p className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping Details
                </p>
              </div>
              <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={infoToSubmit.first_name}
                  onChange={handleChange}
                />
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={infoToSubmit.last_name}
                  onChange={handleChange}
                />
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Any other notes"
                  name="Notes"
                  value={infoToSubmit.Notes}
                  onChange={handleChange}
                />
                <input
                  className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                  type="text"
                  placeholder="Phone Number"
                  name="phone_Number"
                  value={infoToSubmit.phone_Number}
                  onChange={handleChange}
                />
              </div>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800 text-center"
                onClick={handleContinueClick}
              >
                Continue
              </button>
              <div className="mt-4 flex justify-start items-center w-full">
                <a
                  href="javascript:void(0)"
                  className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600"
                >
                  Back to my bag
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
              <div>
                <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                  Order Summary
                </h1>
              </div>
              <div className="flex justify-between w-full items-center mt-10">
                <p className="text-lg leading-4 text-gray-600">Items count </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  {elements && elements.items.length}
                </p>
              </div>
              {elements &&
                elements.items.map((el) => {
                  const itemQuantity =
                    cartItems.find((item) => item.item_id === el.id)?.qnty || 0; // Find quantity for this item
                  const itemTotal = el.price * itemQuantity; // Calculate total for this item
                  return (
                    <div
                      className="flex mt-7 flex-col items-end w-full space-y-6"
                      key={el.id}
                    >
                      <div className="flex justify-between w-full items-center">
                        <p className="text-lg leading-4 text-gray-600">
                          {el.title} (x{itemQuantity})
                        </p>
                        <p className="text-lg font-semibold leading-4 text-gray-600">
                          {el.price}
                        </p>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-lg leading-4 text-gray-600">Total</p>
                        <p className="text-lg font-semibold leading-4 text-gray-600">
                          {itemTotal}
                        </p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              <div className="flex justify-between w-full items-center mt-32">
                <p className="text-xl font-semibold leading-4 text-gray-800">
                  Total Of everything
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-800">
                  ${subtotal}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="holder_checkout">
          <div id="us2" className="mapholder22"></div>
          <div className="access_btn">
            <button onClick={handleAcceptLocation}>Access location</button>
            <button
              className="button"
              onClick={async () => {
                console.log(longitude);
                console.log(latitude);
                setInfoToSubmit({
                  ...infoToSubmit,
                  latitude: latitude,
                  longitude: longitude,
                });
                try {
                  const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
                  const response = await fetch(geoApiUrl);
                  if (!response.ok) {
                    throw new Error("Failed to fetch location information");
                  } else {
                    const data = await response.json();
                    const city = data.city;
                    // console.log(city);
                    // setInfoToSubmit({
                    //   ...infoToSubmit,
                    //   latitude: latitude,
                    //   longitude: longitude,
                    //   city: city,
                    // });
                    setLatitude(latitude);
                    setLongitude(longitude);
                    // nav("/main/Addrestaurant/Addprofile");
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Continue
              <FaArrowRight className="icon" style={{ color: "white" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
