import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const AskName = () => {
  const { setRegistrationInfo, RegestrationInfo, User } = useStateContext();
  const [isValid, setIsValid] = useState(false);
  const [restaurantType, setRestaurantType] = useState(""); // New state for restaurant type

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationInfo((prevData) => ({
      ...prevData,
      user_id: User.id,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Check if both name and phone number are not empty
    if (
      RegestrationInfo.name.trim() !== "" &&
      RegestrationInfo.phoneNumber.trim() !== ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [RegestrationInfo]);

  const nav = useNavigate();
  const handleClick = () => {
    if (isValid) {
      nav("/main/Addrestaurant/AddLocation");
    } else {
      console.log("Please fill in all fields");
    }
  };

  return (
    <div className="form-container" style={{ margin: "auto" }}>
      <div className="logo-container">Please add your info!</div>
      <div className="line"></div>
      <form className="form">
        <div className="form-group">
          <label htmlFor="name">Restaurant Name</label>
          <input
            required
            placeholder="Enter your Restaurant Name"
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={RegestrationInfo.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Restaurant phone Number</label>
          <input
            required
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={handleChange}
            value={RegestrationInfo.phoneNumber}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Choose type</label> {/* Add label for select */}
          <select
            id="type"
            name="type"
            // value={restaurantType}
            onChange={handleChange} // Update restaurant type state
          >
            <option value="">Select Type</option>
            <option value="Regular Restaurant">Regular Restaurant</option>
            <option value="Food truck">Food truck</option>
            <option value="Caffe">Caffe</option>
            <option value="Dessert">Dessert</option>{" "}
          </select>
        </div>

        <button
          type="button" // Prevent form submission
          className="form-submit-btn"
          onClick={handleClick}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AskName;
