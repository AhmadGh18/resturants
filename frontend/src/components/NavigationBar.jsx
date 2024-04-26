import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons from react-icons
import "./template.css";
const NavigationBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <header className="header" data-header>
      <div className="container">
        <Link to="/" className="logo">
          <img src=" " width="160" height="50" alt="Grilli - Home" />
        </Link>
        <nav className={`navbar ${isActive ? "active" : ""}`}>
          <button
            className="close-btn"
            aria-label="close menu"
            onClick={toggleNavbar}
          >
            <span>
              <FaTimes />
            </span>
          </button>
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link
                to="#home"
                className="navbar-link hover-underline"
                onClick={toggleNavbar}
              >
                <div className="separator"></div>
                <span className="span">Home</span>
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="#menu"
                className="navbar-link hover-underline"
                onClick={toggleNavbar}
              >
                <div className="separator"></div>
                <span className="span">Menus</span>
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="#about"
                className="navbar-link hover-underline"
                onClick={toggleNavbar}
              >
                <div className="separator"></div>
                <span className="span">About Us</span>
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="#chefs"
                className="navbar-link hover-underline"
                onClick={toggleNavbar}
              >
                <div className="separator"></div>
                <span className="span">Our Chefs</span>
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="#contact"
                className="navbar-link hover-underline"
                onClick={toggleNavbar}
              >
                <div className="separator"></div>
                <span className="span">Contact</span>
              </Link>
            </li>
          </ul>
          <div className="text-center">
            <p className="headline-1 navbar-title">Contact Us</p>

            <p className="body-4 navbar-text"></p>
            <a href="mailto:booking@grilli.com" className="body-4 sidebar-link">
              booking@grilli.com
            </a>
            <div className="separator"></div>
            <p className="contact-label">Booking Request</p>
            <a
              href="tel:+88123123456"
              className="body-1 contact-number hover-underline"
            >
              {" "}
              81501749
            </a>
          </div>
        </nav>
        <a href="#" className="btn btn-secondary">
          <span className="text text-1">
            <Link to="/newUser/login">Register</Link>
          </span>
          <span className="text text-2" aria-hidden="true">
            <Link to="/newUser/login">Register</Link>
          </span>
        </a>
        <button
          className="nav-open-btn"
          aria-label="open menu"
          onClick={toggleNavbar}
        >
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>
        <div
          className={`overlay ${isActive ? "active" : ""}`}
          onClick={toggleNavbar}
        ></div>
      </div>
    </header>
  );
};

export default NavigationBar;
