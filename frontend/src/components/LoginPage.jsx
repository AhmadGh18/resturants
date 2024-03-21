import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import "./login.css";
import { FaEye } from "react-icons/fa";
import axios from "axios";
const LoginPage = () => {
  const [error, setError] = useState(null);
  const { User, setUser, setToken, token } = useStateContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  if (token) {
    return <Navigate to="/user" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      axiosClient
        .post("/user/login", formData)
        .then((data) => {
          console.log(data);
          setToken(data.data.token);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error);
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="login-root">
      <div
        className="box-root flex-flex flex-direction--column"
        style={{ minHeight: "100vh", flexGrow: 1 }}
      >
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            <div className="box-root box1 flex-flex">
              <div className="box-root"></div>
            </div>
            <div className="box-root box2 flex-flex">
              <div
                className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 6 / start / auto / 2" }}
            >
              <div
                className="box-root box-background--blue800"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 7 / start / auto / 4" }}
            >
              <div
                className="box-root box-background--blue animationLeftRight"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 8 /4 /  auto / 6" }}
            >
              <div
                className="box-root box-background--gray100 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 2 /15 /  auto / end" }}
            >
              <div
                className="box-root box-background--cyan200 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 3 /14 /  auto / end" }}
            >
              <div
                className="box-root box-background--blue animationRightLeft"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 4 /17 /  auto / 20" }}
            >
              <div
                className="box-root box-background--gray100 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: " 5 /14 /  auto / 17" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="box-root padding-top--24 flex-flex flex-direction--column"
          style={{ flexGrow: 1, zIndex: 9 }}
        >
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">
                  Sign in to your account
                </span>
                <form id="stripe-login" onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert">
                      <p>{error}</p>
                    </div>
                  )}
                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange} />
                  </div>
                  <div className="field padding-bottom--24">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
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
                  <div className="field"></div>
                </form>
              </div>
            </div>
            <div className="footer-link padding-top--24">
              <span>
                Don't have an account?{" "}
                <a href="">
                  <Link to="/newUser/signup">Sign up</Link>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
