import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./swiper.css";

// import required modules
import { Navigation } from "swiper/modules";

const SwiperElement = (props) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {props.images.map((el, index) => (
        <SwiperSlide key={index}>
          <img
            src={`http://localhost:8000/storage/${el.imgUrl}`}
            alt={`Image ${index}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperElement;
