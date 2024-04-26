import React from "react";
import "./usernav.css";
import { Link } from "react-router-dom";
const UserNav = () => {
  return (
    <div>
      <header>
        <div className="logo">EVLEARN</div>
        <input type="checkbox" id="nav_check" hidden />
        <nav>
          <ul>
            <li>
              <Link to="" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/Items">Items</Link>
            </li>
            <li>
              <Link to="/allrestaurants">All restaurants</Link>
            </li>
            <li>
              <Link to="/nearby">Nearby</Link>
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
