import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider";

const AddLocationAndSubmit = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState(33.883346253230904);
  const [longitude, setLongitude] = useState(35.517484664916985);
  const [city, setCity] = useState("");
  const nav = useNavigate();

  const { token } = useStateContext();
  if (!token) {
    return nav("/newUser/login");
  }

  return (
    <div className="holder_checkout">
      <div id="us2" className="mapholder22"></div>
      <div className="access_btn">
        <button onClick={handleAcceptLocation}>Access location</button>
        <button onClick={() => onSubmit(latitude, longitude, city)}>
          Deliver here
        </button>
      </div>
    </div>
  );
};

export default AddLocationAndSubmit;
