import React from "react";
import { Link } from "react-router-dom";

const SingleItemCard = (props) => {
  return (
    <div>
      <div
        key={props.id}
        className="max-w-xs sm:max-w-sm md:max-w-md rounded overflow-hidden shadow-lg item1"
      >
        <img
          className="w-full h-40 object-contain"
          src={`http://localhost:8000/storage/${props.thumbnail}`}
          alt="Item thumbnail"
        />
        <div className="px-6 py-1 item11">
          <div className="flex items-center mb-2">
            <img
              className="h-10 w-10 rounded-full mr-2 object-cover"
              src={`http://localhost:8000/storage/${props.profile_picture}`}
              alt="Restaurant profile"
            />
            <Link to={`/singleRestaurant/${props.restaurant_id}`}>
              <h1 className="text-xl font-bold cursor-pointer inline nostyle">
                {props.restaurant_name}
              </h1>
            </Link>
          </div>
          <div className="font-bold text-lg mb-2">
            <Link to={`/SingleProductDetails/${props.id}`}>
              item: {props.title}
            </Link>
          </div>
          <p className="text-sm text-gray-700">price: {props.price}</p>
        </div>
        {/* <div className="px-6 pt-2 pb-2 item11">
          {props.tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default SingleItemCard;
