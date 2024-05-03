import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient.js";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import UserNav from "./components/UserNav.jsx";
import ItemCard from "./MainComponents/ItemCard.jsx";

const NearbyPlace = () => {
  const [latitude, setLatitude] = useState(33.883346253230904);
  const [longitude, setLongitude] = useState(35.517484664916985);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const [perPage] = useState(12); // Number of items per page

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

  const fetchNearbyRestaurants = async (latitude, longitude, radius) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/restaurant/getnearbyrestaurants?latitude=${latitude}&longitude=${longitude}&&radius=${radius}`
      );
      console.log(response);
      const sortedRestaurants = response.data.sort(
        (a, b) => a.distance - b.distance
      );
      setNearbyRestaurants(sortedRestaurants);
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    } finally {
      setLoading(false);
    }
  };
  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    setPageNumber(0);
    if (window.jQuery) {
      import(
        "https://rawgit.com/Logicify/jquery-locationpicker-plugin/master/dist/locationpicker.jquery.js"
      )
        .then(() => {
          const mapOptions = {
            location: {
              latitude,
              longitude,
            },
            radius: 0,
            enableAutocomplete: true,
            oninitialized: (component) => {
              component.map.setCenter(
                new google.maps.LatLng(latitude, longitude)
              );
              component.map.setZoom(15);
            },
            onchanged: (currentLocation, radius, isMarkerDropped) => {
              setLatitude(currentLocation.latitude);
              setLongitude(currentLocation.longitude);
              fetchLocationInfo(
                currentLocation.latitude,
                currentLocation.longitude
              );
              fetchNearbyRestaurants(
                currentLocation.latitude,
                currentLocation.longitude
              );
            },
          };

          $("#us2").locationpicker(mapOptions);
        })
        .catch((error) => {
          console.error("Error loading locationpicker plugin:", error);
        });
    } else {
      console.error("jQuery is not available.");
    }
    fetchNearbyRestaurants(latitude, longitude);
  }, [latitude, longitude]);

  function handleAcceptLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("long", longitude);
          console.log("lat", latitude);

          if ($("#us2").locationpicker) {
            $("#us2").locationpicker("location", {
              latitude,
              longitude,
            });
          }

          fetchNearbyRestaurants(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }
  useEffect(() => handleAcceptLocation, []);
  return (
    <div>
      <UserNav />
      <div id="us2" className="mapholder"></div>
      <button
        className="p-2 bg-blue-600 m-3 text-white rounded-[10px]"
        onClick={handleAcceptLocation}
      >
        Access my location
      </button>

      {loading && <p>Loading nearby restaurants...</p>}
      {!loading && nearbyRestaurants.length === 0 && (
        <p>No nearby restaurants found.</p>
      )}
      {!loading && nearbyRestaurants.length > 0 && (
        <div>
          <div className="section">
            <div className="restaurantContiners">
              {nearbyRestaurants
                .slice(pageNumber * perPage, (pageNumber + 1) * perPage)
                .map((el) => (
                  <ItemCard
                    key={el.id}
                    name={el.name}
                    type={el.type}
                    img={el.profile_picture}
                    average_rating={el.rating}
                    rating_count={el.rating_count}
                    id={el.id}
                    distance={el.distance}
                  />
                ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={Math.ceil(nearbyRestaurants.length / perPage)}
                onPageChange={handlePageChange}
                previousClassName={"pagination"}
                nextClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyPlace;
