import React, { useState } from "react";
import axiosClient from "../axiosClient";

const AddMultipleImage = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`imgUrl[${index}]`, image);
    });
    // Add other form data here if needed, such as item_id

    axiosClient
      .post("/images/add", formData)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Images uploaded successfully", data);
        // Handle success response here
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        // Handle error here
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <button type="submit">Upload Images</button>
      </form>
    </div>
  );
};

export default AddMultipleImage;
