import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

const NearbyPlace = () => {
  const [latitude, setLatitude] = useState(33.883346253230904);
  const [longitude, setLongitude] = useState(35.517484664916985);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

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

  const fetchNearbyRestaurants = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/restaurant/getnearbyrestaurants?latitude=${latitude}&longitude=${longitude}`
      );
      setNearbyRestaurants(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching nearby restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  }, []);

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

  return (
    <div>
      <div id="us2" className="mapholder"></div>
      {/* <button onClick={handleAcceptLocation}>Access my location</button> */}

      {loading && <p>Loading nearby restaurants...</p>}
      {!loading && nearbyRestaurants.length === 0 && (
        <p>No nearby restaurants found.</p>
      )}
      {/* {!loading && nearbyRestaurants.length > 0 && (
        <div>
          <h2>Nearby Restaurants:</h2>
          <ul>
            {nearbyRestaurants.map((restaurant) => (
              <li key={restaurant.id}>{restaurant.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default NearbyPlace;
