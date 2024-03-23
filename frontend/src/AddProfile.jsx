import React, { useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "./axiosClient";

const AddProfile = () => {
  const { RegestrationInfo, setRegistrationInfo, User } = useStateContext();
  const [src, setSrc] = useState("");
  const nav = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRegistrationInfo((prevData) => ({
        ...prevData,
        profile_picture: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleclick = () => {
    console.log(RegestrationInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", RegestrationInfo.name);
    formData.append("city", RegestrationInfo.city);
    formData.append("phoneNumber", RegestrationInfo.phoneNumber);
    formData.append("longitude", RegestrationInfo.longitude);
    formData.append("latitude", RegestrationInfo.latitude);
    formData.append("type", RegestrationInfo.type);
    formData.append("profile_picture", RegestrationInfo.profile_picture);
    formData.append("user_id", User.id);

    axiosClient
      .post("/restaurant/create", formData)
      .then((res) => {
        console.log(res);
        nav("/main/restaurantPage/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container" style={{ margin: "auto" }}>
      <h1>Add a Logo for your restaurant</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="addimg"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="imgHolder">
          {src && <img src={src} alt="Preview" />}
        </div>
        <label htmlFor="addimg" className="addimg">
          Add profile
        </label>
        <div className="btn-holder">
          <button
            className="button"
            onClick={() => nav("/main/Addrestaurant/AddLocation")}
          >
            <FaArrowLeft className="icon" />
            Back
          </button>
          <button type="submit" className="button">
            Let's start
            <FaArrowRight className="icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;
