import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TourTypesCard from "../../../components/TourTypesCard";
import { GiHiking } from "react-icons/gi";
import { MdOutlineSportsHandball } from "react-icons/md";
import { BsPersonWalking } from "react-icons/bs";
import { FaTree } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import usePackages from "../../../hooks/usePackages";

export default function TourTypeSlide() {
  const { packages } = usePackages();

  const packageIcon = (type) => {
    if (type === "hiking") return GiHiking;
    else if (type === "sports") return MdOutlineSportsHandball;
    else if (type === "walking") return BsPersonWalking;
    else if (type === "wildlife") return FaTree;
    else if (type === "air_rides") return IoMdAirplane;
    else return "";
  };

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
        {packages &&
          packages.map((singlePackage) => {
            return (
              <SwiperSlide className="h-full" key={singlePackage._id}>
                <TourTypesCard
                  title={singlePackage.type}
                  icon={packageIcon(singlePackage.type)}
                  type={singlePackage.type}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="swiper-button-next absolute right-2 flex items-center justify-center h-4 w-4 bg-opacity-50 text-white rounded-full cursor-pointer z-10"></div>
      <div className="swiper-button-prev absolute left-2 flex items-center justify-center h-4 w-4 bg-opacity-50 text-white rounded-full cursor-pointer z-10"></div>
    </div>
  );
}
