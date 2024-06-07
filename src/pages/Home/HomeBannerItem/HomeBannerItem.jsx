import React from "react";

const HomeBannerItem = ({ image, heading, details }) => {
  console.log("heading-detail", heading, details);
  return (
    <div className="h-full relative flex items-center justify-center">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="bg-cover bg-center h-full w-full flex items-center justify-center"
      >
        {/* Apply gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
        <div className="relative z-10 p-8 text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">{heading}</h1>
          <p className="mt-2 text-2xl font-thin text-center">{details}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerItem;
