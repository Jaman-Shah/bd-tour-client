import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TourTypesCard from "../../../components/TourTypesCard";
import { GiHiking } from "react-icons/gi";

export default function TourTypeSlide() {
  return (
    <div className="relative  h-52 flex items-center">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        watchSlidesProgress={true}
        slidesPerView={3}
        spaceBetween={16}
        className="mySwiper h-full"
      >
        <SwiperSlide className="h-full">
          <TourTypesCard title="Hiking" icon={GiHiking} />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <TourTypesCard title="1" />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <TourTypesCard title="1" />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <TourTypesCard title="1" />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <TourTypesCard title="1" />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-next absolute right-2 flex items-center justify-center h-4 w-4 bg-opacity-50 text-white rounded-full cursor-pointer z-10"></div>
      <div className="swiper-button-prev absolute left-2 flex items-center justify-center h-4 w-4 bg-opacity-50 text-white rounded-full cursor-pointer z-10"></div>
    </div>
  );
}
