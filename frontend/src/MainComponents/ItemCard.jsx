import React from "react";
import "./Cartitem.css";
import img1 from "../assets/images/home-tab3-hero-1367x520-prog.jpg";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const ItemCard = (props) => {
  const { id, User, token } = useStateContext();
  const Profileview = () => {
    if (token) {
      axiosClient.post(`/profileview/${User.id}/${props.id}`).then((res) => {
        console.log(res);
      });
    }
  };
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
        {props.city && <p className="p mb-1">Located in {props.city}</p>}

        {props.distance && (
          <p className="p">
            {props.distance.toString().substring(0, 4)} km away from you
          </p>
        )}
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
              {(props.rating_count || props.rating_count == 0) && (
                <span style={{ fontSize: "12px" }} className="text-gray-600">
                  {props.rating_count} reviews
                </span>
              )}
            </div>
          </p>
        </div>
        <Link
          onClick={Profileview}
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
