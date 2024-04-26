// export default Itemss;
import React from "react";
import { Link } from "react-router-dom";

const Itemss = (props) => {
  return (
    <div>
      <div className="rounded overflow-hidden shadow-lg">
        <div className="relative">
          <a href="#">
            <img
              className="w-full"
              src={`http://localhost:8000/storage/${props.thumbnail}`}
              alt="Sunset in the mountains"
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          </a>
          <a href={`/SingleProductDetails/${props.id}`}>
            <div
              style={{ backgroundColor: "#F97316" }}
              className="absolute bottom-0 left-0 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              details
            </div>
          </a>
        </div>
        <div className="px-6 py-3">
          <p className="text-gray-500 text-lg">title:{props.title}</p>
        </div>
        <div className="px-6 pb-3">
          <p className="text-gray-500 text-sm">price : {props.price}</p>
        </div>
        {/* <div className="px-6 py-4 flex flex-row items-center">
          <span
            href="#"
            className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row justify-between items-center flex-wrap"
          >
            {props.tags.split(",").map((tag, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  backgroundColor: "#7c7a7a",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Itemss;
