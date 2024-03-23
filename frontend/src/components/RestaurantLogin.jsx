import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const RestaurantLogin = () => {
  const { setUser, setToken, token } = useStateContext();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password_confirmation: "",
    has_restaurant: 1,
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
    console.log(formData);
    axiosClient
      .post("/user/signup", formData)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        nav("/main/AddRestaurant/AddName");

        console.log(response);
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status === 422) {
          setError(response.data.errors);
          console.log(response.data.errors);
        }
      });
  }

  return (
    <div className="login-root">
      <div
        className="box-root flex-flex flex-direction--column"
        style={{ minHeight: "100vh", flexGrow: 1 }}
      >
        <div className="formbg-outer">
          <div className="formbg">
            <div className="formbg-inner padding-horizontal--48">
              <span className="padding-bottom--15">Create account</span>
              <form id="stripe-login" onSubmit={handleSubmit}>
                {errors && (
                  <div className="alert">
                    {Object.keys(errors).map((key) => (
                      <p style={{ color: "red" }} key={key}>
                        {errors[key][0]}
                      </p>
                    ))}
                  </div>
                )}
                <div className="field padding-bottom--20 rowdiv">
                  <div>
                    <label htmlFor="email">first Name</label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <div className="field padding-bottom--21">
                      <label htmlFor="email">Last name</label>
                      <input
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="field padding-bottom--21">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" onChange={handleChange} />
                </div>
                <div className="field padding-bottom--21">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="user_phone"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="field padding-bottom--21">
                  <label htmlFor="email">password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field padding-bottom--24">
                  <label htmlFor="password">Repeat password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field padding-bottom--24">
                  <input
                    type="submit"
                    name="submit"
                    value="Continue"
                    style={{
                      backgroundColor: "#f1d133",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  Already have an account ?{" "}
                  <Link to="/newUser/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;
