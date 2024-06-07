import React, { useEffect } from "react";
import Swal from "sweetalert";

const Map = () => {
  useEffect(() => {
    if (window.jQuery) {
      import(
        "https://rawgit.com/Logicify/jquery-locationpicker-plugin/master/dist/locationpicker.jquery.js"
      )
        .then(() => {
          // Initialize locationpicker plugin
          $("#us2").locationpicker({
            location: {
              latitude: 33.883346253230904,
              longitude: 35.517484664916985,
            },
            radius: 0,
            enableAutocomplete: true,
          });
        })
        .catch((error) => {
          console.error("Error loading locationpicker plugin:", error);
        });
    } else {
      console.error("jQuery is not available.");
    }
  }, []);

  function showLocation() {
    // Check if jQuery is available and locationpicker is initialized
    if (window.jQuery && $.fn.locationpicker) {
      const location = $("#us2").locationpicker("location");
      // console.log("Latitude:", location.latitude);
      // console.log("Longitude:", location.longitude);
    } else {
      console.error("jQuery or locationpicker plugin is not available.");
    }
  }

  const showConfirmation = () => {
    Swal({
      title: "Are you sure?",
      text: "Is this your location? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        Swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <div>
      <div id="us2" style={{ width: "500px", height: "400px" }}></div>
      <button onClick={showLocation}>Show New Location</button>
      <button onClick={showConfirmation}>Show Confirmation</button>
    </div>
  );
};

export default Map;
