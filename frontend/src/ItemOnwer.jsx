import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "./axiosClient";

const ItemOnwer = () => {
  const { id } = useParams();
  const [categoryInput, setCategoryInput] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imgtodelete, setImagetodelete] = useState([]);
  const [item, setItem] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    axiosClient.get(`/items/${id}`).then((response) => {
      setItem(response.data.item);
      const itemTags = response.data.item.tags
        ? response.data.item.tags.split(",")
        : [];
      setImages(response.data.images);
      setTags(itemTags);
      setThumbnailPreview(
        `http://localhost:8000/storage/${response.data.item.thumbnail}`
      );
    });
  }, [id]);

  const foodOptions = [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burger" },
    { id: 3, name: "Pasta" },
    { id: 4, name: "Sandwiches" },
    { id: 5, name: "Dessert" },
    { id: 6, name: "Sushi" },
    { id: 7, name: "Tacos" },
    { id: 8, name: "Salad" },
    { id: 9, name: "Steak" },
    { id: 10, name: "Seafood" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryInput = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setTags((prevCategories) => [...prevCategories, categoryInput]);
      setCategoryInput("");
    }
  };

  const handleDeleteCategory = (index) => {
    setTags((prevCategories) => prevCategories.filter((_, i) => i !== index));
  };

  const handleDeleteImage = (imageId) => {
    const updatedImages = images.filter((img) => img.id !== imageId);
    setImages(updatedImages);
    setImagetodelete([...imgtodelete, imageId]); // Spread operator to update the array
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the data to the FormData object
    formData.append("id", item.id);
    formData.append("title", item.title);
    formData.append("price", item.price);
    formData.append("category", item.category);
    formData.append("description", item.description);
    formData.append("tags", tags.join(","));

    // Append the images to delete
    if (imgtodelete && imgtodelete.length > 0) {
      imgtodelete.forEach((imageId) => {
        formData.append("imagesToDelete[]", imageId); // Append each imageId separately
      });
    }

    // Append the thumbnail file if it's changed
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    try {
      // Send the FormData object to the backend
      const response = await axiosClient.post("/item/update", formData);

      // Handle the response
      nav("/main/restaurantPage/manageItems");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const nav = useNavigate();
  return (
    <div>
      {item && (
        <div className="flex items-center justify-center p-12  mr-[100px] ml-[100px]">
          <div className="mx-auto w-full  bg-white w-100">
            <form className="p-12 w-100" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Full Name"
                  value={item.title}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter the price"
                  value={item.price}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Category
                </label>
                <select
                  name="category"
                  value={item.category}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {foodOptions.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Description
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={item.description}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={categoryInput}
                      onChange={handleCategoryInput}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Add a category (e.g., burger, pizza)"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Tags
                    </label>
                    <div className="mt-2 flex flex-wrap">
                      {tags.map((category, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mt-2 flex items-center"
                        >
                          {category}
                          <button
                            type="button"
                            className="ml-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                            onClick={() => handleDeleteCategory(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Thumbnail
                </label>
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="h-48 w-auto rounded-md mb-3"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />

                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Images Details
                </label>
                <div className="mx-3 flex flex-wrap">
                  {images &&
                    images.map((el) => (
                      <div key={el.id} className="relative mr-3 mb-3">
                        <img
                          src={`http://localhost:8000/storage/${el.imgUrl}`}
                          alt="Item Image"
                          className="h-48 w-auto rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={() => handleDeleteImage(el.id)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  <div className="relative mr-3 mb-3 w-[600px]"></div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Update
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="mt-3 hover:shadow-form w-full rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    axiosClient.delete(`/item/${item.id}`).then(() => {
                      nav("/main/restaurantPage/manageItems");
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemOnwer;
