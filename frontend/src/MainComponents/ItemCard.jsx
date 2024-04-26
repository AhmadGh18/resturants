import React from "react";
import "./Cartitem.css";
import img1 from "../assets/images/home-tab3-hero-1367x520-prog.jpg";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemCard = (props) => {
  return (
    <div className="card">
      <div className="img">
        <img
          src={`http://localhost:8000/storage/${props.img}`}
          style={{ borderRadius: "6px", width: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="text">
        <p className="h3">{props.name}</p>
        <p className="p">{props.type}</p>
        <p className="p mb-1">Located in {props.city}</p>

        {props.distance && <p className="p">{props.distance}</p>}
        <div>
          <p className="span">
            <div className="flex justify-between mb-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    color={index < props.average_rating ? "gold" : "gray"}
                    className="w-4 h-4 mr-1"
                  />
                ))}
              </div>
              <span style={{ fontSize: "12px" }} className="text-gray-600">
                {props.rating_count} reviews
              </span>
            </div>
          </p>
        </div>
        <Link
          to={`/singlerestaurant/${props.id}`}
          style={{
            backgroundColor: "#52a0e9",
            color: "white",
            borderRadius: "2px",
            padding: "2px",
            textAlign: "center",
          }}
        >
          <button>Check</button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
