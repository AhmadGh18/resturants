import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";

const AddItem = () => {
  const { restaurant, setRestaurant, User } = useStateContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    currency: "",
    description: "",
    thumbnail: null,
    images: [],
    categories: [],
    restaurant_id: restaurant.id,
  });

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await axiosClient.get(
          `/restaurant/getByUserId/${User.id}`
        );
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant information:", error);
      }
    };

    fetchRestaurantInfo();
  }, [User.id]);
  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: file,
    }));

    const preview = URL.createObjectURL(file);
    setThumbnailPreview(preview);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...files], // Concatenate the new files with existing images array
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryInput = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setCategories((prevCategories) => [...prevCategories, categoryInput]);
      setCategoryInput("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteCategory = (index) => {
    setCategories((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("title", formData.title);
    formDataObject.append("price", formData.price);
    formDataObject.append("description", formData.description);
    formDataObject.append("restaurant_id", restaurant.id);
    formDataObject.append("thumbnail", formData.thumbnail);
    selectedFiles.forEach((file, index) => {
      formDataObject.append(`images[${index}]`, file);
    });
    const joinedCategories = categories.join(",");
    formDataObject.append("categories", joinedCategories);
    axiosClient
      .post("/items/create", formDataObject)
      .then((response) => {
        console.log("Success:", response.data);
        // Handle success (e.g., show success message)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 sm:w-full change">
              <form
                action="#"
                className="space-y-4 "
                onSubmit={handleSubmit}
                encType="multiple/form-data"
              >
                <h1>Add Item</h1>
                <div>
                  <label className="sr-only" htmlFor="name">
                    Title
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Title"
                    type="text"
                    name="title"
                    id="name"
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Price
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="price"
                      type="number"
                      id="phone"
                      name="price"
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <select
                      name="currency"
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      onChange={handleChange}
                    >
                      <option value="$$">$$</option>
                      <option value="LL">LL</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Description"
                    rows="4"
                    id="message"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                  <p>Choose thumbail</p>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleThumbnailSelect}
                  />
                </div>
                <img
                  src={thumbnailPreview}
                  className="w-32 h-32 object-cover rounded-lg mr-2 mb-2"
                />
                <div>
                  <label htmlFor="filein">Choose Images</label>
                  <input
                    type="file"
                    id="filein"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleFileSelect}
                  />
                  <div className="mt-2 flex flex-wrap">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-32 h-32 object-cover rounded-lg mr-2 mb-2"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          onClick={() => handleDeleteImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <label
                    htmlFor="filein"
                    className="block mt-2 cursor-pointer text-blue-500"
                  >
                    Add Picture
                  </label>
                </div>

                <div>
                  <label htmlFor="category">Categories:</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="category"
                      value={categoryInput}
                      onChange={handleCategoryInput}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Add category for ex burger pizza (more than 1)"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {categories.map((category, index) => (
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

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddItem;
