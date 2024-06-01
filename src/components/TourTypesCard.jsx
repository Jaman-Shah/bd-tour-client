import React from "react";

const TourTypesCard = ({ title, image, icon: Icon }) => {
  return (
    <div className="h-full w-full bg-transparent border  flex items-center justify-center text-[#575FCF] rounded-full cursor-pointer">
      <div>
        {Icon && <Icon className="text-[80px]" />}
        <p className="font-bold text-3xl uppercase border-t mt-4 ">{title}</p>
      </div>
    </div>
  );
};

export default TourTypesCard;
