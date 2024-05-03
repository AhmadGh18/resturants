import React, { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import SimilarSwiper from "./SimilarSwiper";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/autoplay";

// import "swiper/css/pagination";
// import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "./MainComponents/ItemCard";
import Itemss from "./Itemss";

const SimilarItems = (props) => {
  const [items, setItems] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    axiosClient.get(`/items/categories/${props.category}`).then((data) => {
      setItems(data.data);
      console.log("from child", data.data);
    });
  }, [props.category]);

  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="hoho">
      {items && (
        <div>
          <Swiper
            className=""
            modules={[Virtual, Navigation, Pagination]}
            onSwiper={setSwiperRef}
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              disableOnInteraction: true,
              delay: 1000,
            }}
            pagination={{
              type: "fraction",
              el: ".swiper-pagination-custom", // Add custom class
            }}
            navigation={true}
            virtual
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {items.map((el, index) => (
              <SwiperSlide key={index}>
                <div className="rounded overflow-hidden shadow-lg w-100 h-100">
                  <a href="#"></a>
                  <div className="relative">
                    <a href="#">
                      <img
                        className="w-full"
                        src={`http://localhost:8000/storage/${el.thumbnail}`}
                        alt="Sunset in the mountains"
                        style={{ height: "200px", width: "100%" }}
                      />
                      <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                    </a>
                    <a href={`/singleProductDetails/${el.id}`}>
                      <div className="absolute bottom-0 left-0 bg-blue-400 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        Details
                      </div>
                    </a>
                  </div>
                  <div className="px-4 py-3">
                    <a
                      href="#"
                      className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
                    >
                      {el.title}
                    </a>
                    <p className="text-gray-500 text-sm">{el.description}</p>
                    <p className="text-gray-500 text-sm">{el.price} $</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SimilarItems;
