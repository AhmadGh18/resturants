import React, { useEffect } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";

const PersonalInfo = () => {
  const { User, setRestaurant, restaurant } = useStateContext();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        if (User) {
          const response = await axiosClient.get(
            `/restaurant/getByUserId/${User.id}`
          );
          setRestaurant(response.data);
        }
      } catch (error) {
        console.error("Error fetching restaurant information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, [User.id]);

  return (
    <div
      className="flex items-center justify-center p-12 m-auto "
      style={{
        width: "100%",
      }}
    >
      <div
        className="form-container mt-10"
        style={{
          margin: "60px auto",
          transform: isLoading ? "translateY(100px)" : "translateY(0)",
          opacity: isLoading ? 0 : 1,
          transition: "transform 0.5s ease, opacity 0.5s ease",
        }}
      >
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="p-10">
            <div className="mb-5">
              <label
                htmlFor="full_name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name"
                value={User && User.full_name}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="user_phone"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="user_phone"
                id="user_phone"
                value={User && User.user_phone}
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
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
              />
            </div>
            {restaurant.restaurant ? (
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="area"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      id="area"
                      placeholder="Enter area"
                      value={restaurant && restaurant.restaurant.name}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="city"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter city"
                      value={restaurant && restaurant.restaurant.city}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="phoneNumber"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Restaurant phone
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter Restaurant Number"
                      value={restaurant && restaurant.restaurant.phoneNumber}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="delivery_range"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Delivery Range
                    </label>
                    <input
                      type="text"
                      name="delivery_range"
                      id="delivery_range"
                      placeholder="Delivery Range"
                      value={
                        restaurant && restaurant.restaurant.deleviery_range
                      }
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="mb-5 w-100">
                  <label
                    htmlFor="bio"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Bio (description)
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    readOnly
                    value={
                      restaurant && restaurant.bio ? restaurant.bio : "No bio"
                    }
                  />
                </div>
              </div>
            ) : null}
            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
