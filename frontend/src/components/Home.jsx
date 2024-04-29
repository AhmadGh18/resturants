import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./template.css";
import UserNav from "./UserNav";
import axiosClient from "../axiosClient";
import AllRestaurants from "../MainComponents/AllRestaurants";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const blurTimeoutRef = useRef(null);
  const { setUser, User } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [allrest, setallrest] = useState([]);
  useEffect(() => {
    axiosClient.get("/restaurant/getAll").then((data) => {
      setallrest(data.data.restaurant);
      const shuffledRestaurants = data.data.restaurants.sort(
        () => Math.random() - 0.5
      );
      const initialRestaurants = shuffledRestaurants.slice(0, 10); // Selecting 10 random restaurants
      setRestaurants(initialRestaurants); // Setting initial restaurants
      // setSearchResults(initialRestaurants); // Setting search results initially
      setallrest(data.data.restaurants);
    });
  }, []);

  useEffect(() => {
    const results = allrest.filter(
      (restaurant) =>
        restaurant.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, allrest]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const results = restaurants.filter((restaurant) =>
      restaurant.city.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  };

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay the onBlur event to allow click event on search result to take effect
    blurTimeoutRef.current = setTimeout(() => {
      setIsFocused(false);
    }, 100); // Adjust the delay time as needed
  };

  const handleResultClick = () => {
    // Clear the onBlur timeout to prevent it from firing after a click
    clearTimeout(blurTimeoutRef.current);
  };

  useEffect(() => {
    const fetchUserLocation = () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        success,
        error,
        { timeout: 5000 } // Adjust timeout as needed
      );
    };

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          updateUserLocation(latitude, longitude, data.city, User.id);
        })
        .catch((error) => {
          console.error("Error fetching user location:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const error = (err) => {
      console.error("Error retrieving user location:", err.message);
      setLoading(false);
    };

    const updateUserLocation = (latitude, longitude, city, id) => {
      axiosClient
        .post("/user/updatelocation", {
          latitude,
          longitude,
          city,
          id,
        })
        .then((response) => {
          console.log("User location updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user location:", error);
        });
    };

    if (User && (User.city === "not set" || User.city === null)) {
      console.log("Fetching user location...");
      fetchUserLocation();
    }
  }, [User]);

  return (
    <div>
      <UserNav />
      <div className="homepage">
        <div className="searchText">
          <h1>Find city or restaurants</h1>
          <div className="searchhold">
            <input
              type="text"
              placeholder="   Search for City or restaurant"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="false"
            />
            <FaSearch className="searchfa" />
          </div>
          <div
            className="searchResult"
            style={{ display: isFocused ? "block" : "none" }}
          >
            <ul className="resultList">
              {searchResults.map((restaurant) => (
                <li
                  key={restaurant.id}
                  className="resultItem"
                  style={{ textAlign: "left" }}
                  onClick={handleResultClick}
                >
                  <Link to={`/singlerestaurant/${restaurant.id}`}>
                    <div className="searchone">
                      {/* <img
                      className="profilelogo"
                      src={`http://localhost:8000/storage/${restaurant.profile_picture}`}
                    /> */}
                      <div className="infobottom">
                        <span>{restaurant.name}</span>

                        <div
                          style={{
                            color: "gray",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span>{restaurant.city}</span>
                          <FaMapMarker />
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/nearby">
            <button className="nearbybtn">Show nearby places</button>
          </Link>
        </div>
      </div>
      {/* <div className="infosection">
        <div>
          <p className="head">Find the best resturants </p>
          <p>near you and any where in lebanon</p>
        </div>
        <div>
          <p className="head">Review resturant see other reviews</p>
          <p>Add feedback and stars</p>
        </div>
        <div>
          <p className="head">Order an Item</p>
          <p>Order from any restaurant in lebanon</p>
        </div>
      </div> */}
      <AllRestaurants />
    </div>
  );
};
export default Home;
