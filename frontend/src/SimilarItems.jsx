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
    <div>
      {items && (
        <div>
          <Swiper
            className="singlswip"
            modules={[Virtual, Navigation, Pagination]}
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
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
                <Itemss
                  id={el.id}
                  key={el.id}
                  title={el.title}
                  price={el.price}
                  thumbnail={el.thumbnail}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SimilarItems;
