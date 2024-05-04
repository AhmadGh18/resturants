import React, { useEffect, useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "./axiosClient";

const AddProfile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { RegestrationInfo, setRegistrationInfo, User } = useStateContext();
  const [src, setSrc] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const nav = useNavigate();
  if (RegestrationInfo.name == null || RegestrationInfo.name == "") {
    return nav("/newUser/");
  }
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
    formData.append("deleviery_range", RegestrationInfo.deleviery_range);

    formData.append("user_id", User.id);

    axiosClient
      .post("/restaurant/create", formData)
      .then((res) => {
        console.log(res);
        nav("/main/restaurantPage");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Set isVisible to true after a short delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Clear the timeout when the component unmounts or when isVisible becomes true
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        margin: isVisible ? "60px auto" : "0 auto",
        transform: isVisible ? "translateY(0)" : "translateY(100px)",
        opacity: isVisible ? 1 : 0,
        transition: "margin 0.5s, transform 0.5s, opacity 0.5s",
      }}
    >
      <h1 className="text-2xl font-bold mb-8">
        Add a Logo for your restaurant
      </h1>

      <form onSubmit={handleSubmit} className="w-64">
        <input
          type="file"
          id="addimg"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="mb-4 relative">
          {!imageLoaded && (
            <div className="bg-gray-300 w-full h-40 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-lg">Placeholder</span>
            </div>
          )}
          {src && (
            <img
              src={src}
              alt="Preview"
              className="w-full h-auto rounded-full"
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
          )}
        </div>
        <label
          htmlFor="addimg"
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Add profile
        </label>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded flex items-center"
            onClick={() => nav("/main/Addrestaurant/AddLocation")}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          >
            Let's start
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;
