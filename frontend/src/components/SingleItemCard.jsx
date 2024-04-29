import React from "react";
import { Link } from "react-router-dom";

const SingleItemCard = (props) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-md carsingle">
      <img
        className="w-full h-48 object-cover"
        src={`http://localhost:8000/storage/${props.thumbnail}`}
        alt="Item thumbnail"
      />
      <div className="px-6 py-4">
        <div className="flex items-center mb-2">
          <img
            className="h-10 w-10 rounded-full mr-2 object-cover"
            src={`http://localhost:8000/storage/${props.profile_picture}`}
            alt="Restaurant profile"
          />
          <Link
            to={`/singleRestaurant/${props.restaurant_id}`}
            className="text-gray-900 font-semibold hover:text-blue-500"
          >
            {props.restaurant_name}
          </Link>
        </div>
        <Link
          to={`/SingleProductDetails/${props.id}`}
          className="text-gray-900 font-bold hover:text-blue-500"
        >
          <h1 className="text-lg md:text-xl mb-2">{props.title}</h1>
        </Link>
        <p className="text-gray-700 font-semibold mb-2">${props.price}</p>
        {/* <div className="flex flex-wrap">
          {props.tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
