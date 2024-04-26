import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const Signup = () => {
  const { setUser, setToken, token } = useStateContext();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password_confirmation: "",
    has_restaurant: 0,
    city: "not set",
    user_phone: "",
    password: "",
  });
  const [errors, setError] = useState(null);

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    axiosClient
      .post("/user/signup", formData)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        nav("/main/userPage");

        // console.log(response);
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status === 422) {
          setError(response.data.errors);
          // console.log(response.data.errors);
        }
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:textblack-200">
          Register your Info
        </h1>
        <form onSubmit={handleSubmit}>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p style={{ color: "red" }} key={key}>
                  {errors[key][0]}
                </p>
              ))}
            </div>
          )}
          <div className="flex">
            <div className="mb-4 mr-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2"
              >
                first Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="text"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
                name="first_name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2"
              >
                last name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="lastname"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Last name"
                name="last_name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2"
            >
              phone Number
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="7143312"
              name="user_phone"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2"
            >
              Email Address
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-2"
            >
              repeat Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Repeat your password"
              required
              onChange={handleChange}
              name="password_confirmation"
            />
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/newUser/login"
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Already Have Account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
/*      */
