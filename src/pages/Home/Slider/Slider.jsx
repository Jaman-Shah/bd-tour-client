import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeBannerItem from "../HomeBannerItem/HomeBannerItem";
import usePackages from "../../../hooks/usePackages";

export default function Slider() {
  const { packages } = usePackages();

  

  return (
    <div className="relative h-[400px] flex items-center">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        watchSlidesProgress={true}
        slidesPerView={1}
        spaceBetween={16}
        className="mySwiper h-full w-full"
      >
        {packages &&
          packages.map((singlePackage) => {
            const imageUrl = singlePackage?.photos?.[0];
           
            return (
              <SwiperSlide>
                <HomeBannerItem
                  key={singlePackage?._id}
                  heading={singlePackage?.title}
                  image={singlePackage?.photos?.[0]}
                  details={singlePackage?.description}
                  className="h-full"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-10 w-10  bg-opacity-50 text-white rounded-full cursor-pointer z-10"></div>
      <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-10 w-10  bg-opacity-50 text-white rounded-full cursor-pointer z-10"></div>
    </div>
  );
}
