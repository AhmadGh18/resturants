import React, { useState, useEffect } from "react";
import axiosClient from "./axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "./context/ContextProvider";
import { useNavigate } from "react-router-dom";
import UserNav from "./components/UserNav";
import Footer from "./Footer";

const Checkout = () => {
  const { User, setUser } = useStateContext();
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
  const [latitude, setLatitude] = useState(33.883346253230904);
  const [longitude, setLongitude] = useState(35.517484664916985);
  const [city, setCity] = useState("");
  const [infoToSubmit, setInfoToSubmit] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    latitude: "",
    notes: "",
    longitude: "",
    user_id: "",
  });

  useEffect(() => {
    handleAcceptLocation();
  }, []);

  const [restaurants, setRestaurants] = useState([]);
  const cartItems = JSON.parse(window.localStorage.getItem("Cart_items")) || [];
  const restaurantIds = cartItems.map((item) => item.restaurant_id);
  useEffect(() => {
    console.log("Fetching restaurants by IDs:", restaurantIds);
    if (restaurantIds.length > 0) {
      axiosClient
        .get("/getRestaurantsByIds", { params: { ids: restaurantIds } })
        .then((response) => {
          console.log("Received restaurants:", response.data);
          setRestaurants(response.data);
        })
        .catch((error) => {
          console.error("Error fetching restaurants:", error);
        });
    } else {
      console.log("No restaurant IDs to fetch.");
    }
  }, []); // Empty dependency array to run once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoToSubmit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (window.jQuery) {
      import(
        "https://rawgit.com/Logicify/jquery-locationpicker-plugin/master/dist/locationpicker.jquery.js"
      )
        .then(() => {
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
  const nav = useNavigate();

  function handleAcceptLocation() {
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
          fetchLocationInfo(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }

  const fetchLocationInfo = async (lat, lng) => {
    try {
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch location information");
      }
      const data = await response.json();
      const newCity = data.city;
      setCity(newCity);
      setInfoToSubmit((prevInfo) => ({
        ...prevInfo,
        latitude: lat,
        longitude: lng,
        city: newCity,
      }));
    } catch (error) {
      console.error("Error fetching location information:", error);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    if (checkdistance()) {
      const finalOrder = {
        ...infoToSubmit,
        user_id: User.id,
        restaurant_id: restaurantIds,
        cartItems: cartItems,
        state: "No Set",
      };

      axiosClient.post("/orders/create", finalOrder).then((res) => {
        toast(`Ordered succefully !`);
        localStorage.removeItem("Cart_items");
        setTimeout(() => {
          nav("/home");
        }, 3000);
      });
    }
  };
  const checkdistance = (e) => {
    if (restaurants.length === 0) {
      console.log("No restaurants available.");
      return;
    }
    let canOrder = true; // Flag variable

    restaurants.forEach((restaurant) => {
      const {
        latitude: restLatitude,
        longitude: restLongitude,
        deleviery_range,
      } = restaurant;
      const distance = calculateDistance(
        parseFloat(infoToSubmit.latitude),
        parseFloat(infoToSubmit.longitude),
        parseFloat(restLatitude),
        parseFloat(restLongitude)
      );

      if (distance > deleviery_range) {
        notify(restaurant.name);
        canOrder = false;
      } else {
        canOrder = true;
      }
    });
    return canOrder; // Return the flag
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const notify = (rest) => {
    toast(`Cannot order from ${rest}  since its doenot deliver this far`);
  };
  return (
    <>
      <UserNav />
      <div
        className="flex flex-col sm:flex-row" // Use flex-column for small screens, flex-row for larger screens
        style={{
          // width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 100px",
        }}
      >
        <div className="w-full sm:w-1/2">
          {" "}
          {/* Full width on small screens, 50% width on larger screens */}
          <div
            id="us2"
            className="mapholder"
            style={{ height: "100vh", width: "100%" }}
          ></div>
          <button
            type="button"
            className="button"
            onClick={handleAcceptLocation}
          >
            Get Location
          </button>
        </div>

        <div className="w-full sm:w-1/2">
          {" "}
          {/* Full width on small screens, 50% width on larger screens */}
          <div className="p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white p-1">
              <form className="m-3" onSubmit={handlesubmit}>
                <div className="mb-4">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    First Name
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="text"
                    name="first_name"
                    id="name"
                    placeholder="first Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-base font-medium text-[#07074D]">
                    Last Name
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    id="name"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-1">
                  <label className="mb-2 block text-base font-medium text-[#07074D]">
                    Phone Number
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Any other notes
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="notes"
                    id="notes"
                    placeholder="Would you like to add somehthing?"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <button
                    className="hover:shadow-form w-full rounded-md bg-blue-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    type="submit"
                  >
                    Order Now
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
