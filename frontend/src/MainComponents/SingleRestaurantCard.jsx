import React from "react";

const SingleRestaurantCard = (props) => {
  return (
    <div className="restaurant-card">
      <img src={props.image} alt={props.name} className="restaurant-image" />
      <p className="restaurant-name">{props.name}</p>
      <p className="restaurant-city">{props.city}</p>
    </div>
  );
};

export default SingleRestaurantCard;
