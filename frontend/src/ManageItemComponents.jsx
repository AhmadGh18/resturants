import React from "react";
import { Link } from "react-router-dom";

const ManageItemComponents = (props) => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 mt-9 ml-5">
        <div className="card card-compact w-96 bg-base-100 shadow-xl rounded-lg">
          <figure>
            <img
              src={
                props.image
                  ? `http://localhost:8000/storage/${props.image}`
                  : "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              }
              alt="food"
              className="rounded-lg w-100 h-70"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title font-bold">{props.title}</h2>
            <p>{props.description}</p>
            <div className="card-actions justify-end">
              <Link
                to={`/main/restaurantPage/dashboard/singleItemToedit/${props.id}`}
                className="btn btn-primary absolute right-5"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItemComponents;
