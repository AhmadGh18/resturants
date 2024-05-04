import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useStateContext } from "./context/ContextProvider";
import { useNavigate } from "react-router-dom";

const AddLocation = () => {
  const [latitude, setLatitude] = useState(33.883346253230904);
  const [longitude, setLongitude] = useState(35.517484664916985);
  const [city, setCity] = useState("");
  const { setRegistrationInfo, RegestrationInfo } = useStateContext();
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
      setRegistrationInfo({
        ...RegestrationInfo,
        latitude: lat,
        longitude: lng,
        city: city,
      });
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

  return (
    <div className="form-container addLoc" style={{ margin: "auto" }}>
      <center>
        <h5>Move the pin and mark to your Restaurant Location</h5>
      </center>
      <div id="us2" className="w-100 mapholder" style={{ width: "100%" }}></div>
      <div className="btn-holder">
        <button
          className="button"
          onClick={() => nav("/main/Addrestaurant/AddName")}
        >
          <FaArrowLeft className="icon" />
          Back
        </button>
        <button
          className="button"
          onClick={async () => {
            console.log(longitude);
            console.log(latitude);
            try {
              const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
              const response = await fetch(geoApiUrl);
              if (!response.ok) {
                throw new Error("Failed to fetch location information");
              } else {
                const data = await response.json();
                const city = data.city;
                console.log(city);
                setRegistrationInfo({
                  ...RegestrationInfo,
                  latitude: latitude,
                  longitude: longitude,
                  city: city,
                });
                nav("/main/Addrestaurant/Addprofile");
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
  );
};

export default AddLocation;
