import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { FaPlus } from "react-icons/fa";
const SideBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { setToken } = useStateContext();
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavLinkClick = () => {
    // Add any logic you need when a navigation link is clicked
    // For example, you might want to close the navigation bar
    setIsNavOpen(false);
  };
  const handlellogut = () => {
    setToken(null);
    location.reload();
  };

  return (
    <div>
      <header>
        <i
          onClick={toggleNavbar}
          className={isNavOpen ? "bx bx-x" : "bx bx-menu"}
          style={{
            color: "black",
            fontSize: "33px",
            zIndex: "9999",
            position: "fixed",
            top: "60px",
            left: "15px",
          }}
        ></i>
      </header>

      <div className={isNavOpen ? "l-navbar show" : "l-navbar"} id="nav-bar">
        <nav className="nav">
          <a href="#" className="nav_logo">
            <span className="nav_logo-name"></span>
          </a>
          <div className="nav_list">
            <Link to="" className="nav_link active">
              <i className="bx bx-grid-alt nav_icon"></i>
              <span className="nav_name">dashboard</span>
            </Link>
            <Link
              to="/main/restaurantPage/dashboard/personalInfo"
              className="nav_link"
              onClick={handleNavLinkClick}
            >
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Users</span>
            </Link>
            <Link
              to="/main/restaurantPage/dashboard/orders"
              className="nav_link"
              onClick={handleNavLinkClick}
            >
              <i className="bx bx-message-square-detail nav_icon"></i>
              <span className="nav_name">Orders</span>
            </Link>

            <Link
              to="/main/restaurantPage/dashboard/menu"
              className="nav_link"
              onClick={handleNavLinkClick}
            >
              <i className="bx bx-folder nav_icon"></i>
              <span className="nav_name">Files</span>
            </Link>
            <Link to="" className="nav_link" onClick={handleNavLinkClick}>
              <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span className="nav_name">Stats</span>
            </Link>
            <Link
              to="/main/restaurantPage/dashboard/additem"
              className="nav_link"
              onClick={handleNavLinkClick}
            >
              <FaPlus
                style={{ color: "white" }}
                className="bx bx-bar-chart-alt-2 nav_icon"
              />
              <span className="nav_name">Add item</span>
            </Link>
          </div>
          <Link className="nav_link" onClick={handlellogut}>
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
