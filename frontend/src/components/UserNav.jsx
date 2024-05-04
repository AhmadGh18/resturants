import React from "react";
import "./usernav.css";
import { Link } from "react-router-dom";
import { FaAccusoft, FaUser } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";
import img from "../assets/_b21eccf6-aceb-4b61-bb4f-711facb64627.jfif";
const UserNav = () => {
  const { User } = useStateContext();
  return (
    <div>
      <header>
        <div
          className="logo"
          style={{ height: "100%", width: "190px", objectFit: "contain" }}
        >
          <img src={img} className="h-100 w-100" />
        </div>
        <input type="checkbox" id="nav_check" hidden />
        <nav>
          <ul>
            <li></li>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/allItems">Items</Link>
            </li>
            <li>
              <Link to="/allrestaurants">All restaurants</Link>
            </li>
            <li>
              <Link to="/nearby">Nearby</Link>
            </li>

            <li>{User && <Link to="/myhome">My home</Link>}</li>
            <li>
              <Link
                to="/newUser/login"
                className="text-gray-500 hover:text-gray-700"
              >
                {User && User.full_name ? (
                  <span className="text-red-500"> {User.full_name}</span>
                ) : (
                  <FaUser className="text-70" style={{ fontSize: "20px" }} />
                )}
              </Link>
            </li>
          </ul>
        </nav>
        <label htmlFor="nav_check" className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </label>
      </header>
    </div>
  );
};

export default UserNav;
