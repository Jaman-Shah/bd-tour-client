import React from "react";

const TourTypesCard = ({ title, image, icon: Icon }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="h-full w-full bg-cover bg-center   rounded-2xl  flex items-center justify-center text-[#575FCF]  cursor-pointer"
    >
      <div>
        {Icon && <Icon className="text-[80px]" />}
        <p className="font-bold text-3xl uppercase border-t mt-4 ">{title}</p>
      </div>
    </div>
  );
};

export default TourTypesCard;
