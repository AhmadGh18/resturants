import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const ExploreRestaurants = (props) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const [restaurants, setrestautants] = useState(null);
  useEffect(() => {
    axiosClient.get(`/restaurants/type/${props.type}`).then((data) => {
      setrestautants(data.data);
    });
  }, []);
  return (
    <div className="hoho">
      <h className="text-xl">Explore Places</h>
      <center></center>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{ delay: 3000 }} // Adjust delay as needed
        pagination={{
          el: ".swiper-pagination-custom", // Add custom class

          type: "fraction",
        }}
        navigation={true}
        virtual
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        <div>
          {restaurants &&
            restaurants.map((el, index) => (
              <SwiperSlide key={index}>
                <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl  bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                    <img
                      src={`http://localhost:8000/storage/${el.profile_picture}`}
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {el.name}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      {el.city}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to={`/singlerestaurant/${el.id}`}
                      data-ripple-light="true"
                      type="button"
                      className="select-none rounded-lg bg-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      visit
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ExploreRestaurants;
