import React, { useEffect, useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";
import { ToastContainer, toast } from "react-toastify";

const PersonalInfo = () => {
  const { User, setRestaurant, restaurant } = useStateContext();
  const [isLoading, setIsLoading] = React.useState(true);
  const [infoToSubmit, setInfoToSubmit] = useState({});

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        if (User) {
          const response = await axiosClient.get(
            `/restaurant/getByUserId/${User.id}`
          );
          setInfoToSubmit(response.data.restaurant);
        }
      } catch (error) {
        console.error("Error fetching restaurant information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, [User.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoToSubmit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(infoToSubmit);
    try {
      // Send the updated info to the backend
      await axiosClient.put(
        `/restaurant/update/${infoToSubmit.id}`,
        infoToSubmit
      );
      toast("Info Update successfully");

      setRestaurant({ restaurant: infoToSubmit });
    } catch (error) {
      console.error("Error updating restaurant information:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center p-1 m-auto"
      style={{ width: "100%" }}
    >
      <div
        className="form-container mt-10 mx-auto w-full max-w-[550px] bg-white"
        style={{
          margin: "60px auto",
          transform: isLoading ? "translateY(100px)" : "translateY(0)",
          opacity: isLoading ? 0 : 1,
          transition: "transform 0.5s ease, opacity 0.5s ease",
        }}
      >
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="full_name"
              className="mb-3 block text-base font-medium text-blue-400"
            >
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Full Name"
              value={infoToSubmit && User.full_name}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-blue-400"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={User && User.email}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              disabled
            />
          </div>
          {infoToSubmit ? (
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-4">
                  <label
                    htmlFor="area"
                    className="mb-3 block text-base font-medium text-blue-400"
                  >
                    city
                  </label>
                  <input
                    type="text"
                    name="area"
                    id="area"
                    placeholder="Enter area"
                    value={infoToSubmit && infoToSubmit.city}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-4">
                  <label
                    htmlFor="range"
                    className="mb-3 block text-base font-medium text-blue-400"
                  >
                    range
                  </label>
                  <input
                    type="text"
                    name="deleviery_range"
                    id="range"
                    placeholder="Enter Range"
                    value={infoToSubmit && infoToSubmit.deleviery_range}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full  w-100">
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="mb-3 block text-base font-medium text-blue-400"
                  >
                    Restaurant phone
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter Restaurant Number"
                    value={infoToSubmit && infoToSubmit.phoneNumber}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full  w-100">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-blue-400"
                  >
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Restaurant Number"
                    value={infoToSubmit && infoToSubmit.name}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4 w-100">
                <label
                  htmlFor="bio"
                  className="mb-3 block text-base font-medium text-blue-400"
                >
                  Bio (description)
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={
                    infoToSubmit && infoToSubmit.bio
                      ? infoToSubmit.bio
                      : "No bio"
                  }
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : null}
          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfo;
