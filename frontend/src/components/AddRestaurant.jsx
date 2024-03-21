import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import "./rest.css";
import axiosClient from "../axiosClient";

const AddRestaurant = () => {
  const { User, setUser } = useStateContext();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    phoneNumber: "",
    longitude: "",
    latitude: "",
    profile_picture: null,
    user_id: User.id,
  });

  useEffect(() => {
    axiosClient
      .get("/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "location") {
      const [latitude, longitude] = value
        .split(",")
        .map((coord) => coord.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        latitude,
        longitude,
      }));
    } else if (name === "profile_picture" && files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        profile_picture: files[0], // Store the File object
      }));
      // Optional: You can set a preview of the image here if needed
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDelete = () => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: null,
    }));
    document.getElementById("preview").src = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make API call to get city name based on latitude and longitude
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${formData.latitude}&longitude=${formData.longitude}&localityLanguage=en`;
    try {
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch city name");
      }
      const data = await response.json();
      const city = data.city;
      setFormData((prevData) => ({
        ...prevData,
        city,
      }));
      console.log(formData); // Move console.log here
    } catch (error) {
      console.error("Error:", error);
    }

    // Check if profile_picture is a file
    if (formData.profile_picture instanceof File) {
      try {
        const formDataCopy = new FormData();
        // Append all form data fields to formDataCopy
        Object.keys(formData).forEach((key) => {
          formDataCopy.append(key, formData[key]);
        });
        axiosClient
          .post("/restaurant/create", formDataCopy)
          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("The profile picture field must be a file.");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="form-container" style={{ margin: "auto" }}>
      <div className="logo-container">Please add your info!</div>
      <div className="line"></div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Restaurant Name</label>
          <input
            required
            placeholder="Enter your Restaurant Name"
            name="name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Restaurant phone Number</label>
          <input
            required
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Restaurant Type</label>
          <select name="type" onChange={handleChange}>
            <option>Choose type</option>
            <option>Regular Restaurant</option>
            <option>Food truck</option>
            <option>Coffee shop</option>
            <option>Dessert shop</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">
            Restaurant Location (latitude, longitude)
          </label>
          <input
            required
            placeholder="ex: 33.87872831263795, 35.49467139087393"
            name="location"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px",
              borderRadius: "10px",
              marginTop: "5px",
            }}
            htmlFor="Add"
          >
            Choose Profile pic
          </label>
          <input
            type="file"
            name="profile_picture"
            id="Add"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          {/* Image Preview */}
          {formData.profile_picture &&
            typeof formData.profile_picture === "object" && (
              <div>
                <img
                  id="preview"
                  src={URL.createObjectURL(formData.profile_picture)}
                  alt="Preview"
                  style={{ height: "300px" }}
                />
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
        </div>
        <button type="submit" className="form-submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
