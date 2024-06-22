import React from "react";

const HomeBannerItem = ({ image, heading, details }) => {

  return (
    <div className="h-full relative flex rounded-2xl  items-center justify-center ">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="bg-cover bg-center h-full w-full flex rounded-full items-center  justify-center"
      >
        {/* Apply gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r rounded-2xl from-black to-transparent opacity-70"></div>
        <div className="relative z-10 p-8 text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            {heading}
          </h1>
          <p className="mt-2 text-xl md:text-2xl font-thin text-center">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerItem;
