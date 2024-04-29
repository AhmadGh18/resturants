import React from "react";
import {
  FaBookmark,
  FaHeadSideCough,
  FaPhone,
  FaStar,
  FaUtensils,
} from "react-icons/fa";

const RestInfo = (props) => {
  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center  bgto">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={`http://localhost:8000/storage/${props.profile_picture}`}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {props.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {props.city}
                </div>

                <div className="flex justify-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < props.average_rating ? "gold" : "gray"}
                      className="w-4 h-4 mr-1"
                    />
                  ))}
                </div>
                <div className="flex justify-center">
                  <span style={{ fontSize: "12px" }} className="text-gray-600">
                    {props.rating_count} reviews
                  </span>
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <FaUtensils className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                  {props.type}
                </div>
                <div className="mb-2 text-blueGray-600">
                  {/* <i className="fas fa-university "></i> */}
                  <FaPhone className=" fas mr-2 text-lg text-blueGray-400" />
                  {props.phoneNumber}
                </div>
              </div>
              <div className="mb-2 text-blueGray-600">
                {/* <i className="fas fa-university "></i> */}
                <center>
                  <FaBookmark
                    className=" fas mr-2 text-lg text-blueGray-400"
                    style={{ fontSize: "23px" }}
                    onClick={props.handlesave}
                  />
                </center>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {props.bio ? props.bio : "No bio yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RestInfo;
