import React, { useState } from "react";
import "./newSide.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { FaPlus } from "react-icons/fa";
const NewSide = () => {
  const [click, setisclic] = useState(false);
  const { setUser } = useStateContext();
  function toggleclick() {
    setisclic(!click);
  }
  function handleout() {
    localStorage.clear();

    location.reload();
  }
  return (
    <div>
      <div className={`sidebar ${click ? "active" : ""} z-10`}>
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name"></div>
          </div>
          <i className="bx bx-menu" id="btn" onClick={toggleclick}></i>
        </div>
        <ul className="nav_list">
          <li>
            <i className="bx bx-search"></i>
            <input placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <Link to="/main/restaurantPage/newDasboard">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <Link to="/main/restaurantPage/personalinfo">
              <i className="bx bx-user"></i>
              <span className="links_name">User</span>
            </Link>
            <span className="tooltip">User</span>
          </li>
          <li>
            <Link to="/main/restaurantPage/Starsandreviews">
              <i className="bx bx-chat"></i>
              <span className="links_name">Messages</span>
            </Link>
            <span className="tooltip">Messages</span>
          </li>
          <li>
            <Link to="/main/restaurantPage/addItem">
              <i className="bx bx-plus"></i>

              <span className="links_name">Add Item</span>
            </Link>
            <span className="tooltip">Add</span>
          </li>
          <li>
            <Link to="/main/restaurantPage/manageItems">
              <i className="bx bx-folder"></i>
              <span className="links_name">Files Manager</span>
            </Link>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <Link to="/main/restaurantPage/Orders">
              <i className="bx bx-cart-alt"></i>
              <span className="links_name">Order</span>
            </Link>
            <span className="tooltip">Order</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className="links_name">Saved</span>
            </a>
            <span className="tooltip">Saved</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Settings</span>
            </a>
            <span className="tooltip">Settings</span>
          </li>
        </ul>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              <img
                src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                alt=""
              />
              <div className="name_job">
                <div className="name">William Roger</div>
                <div className="job">Software Developer</div>
              </div>
            </div>
            <i
              className="bx bx-log-out cursor-pointer"
              id="log_out"
              onClick={handleout}
            ></i>
          </div>
        </div>
      </div>
      <div className="home_content"></div>
    </div>
  );
};

export default NewSide;
