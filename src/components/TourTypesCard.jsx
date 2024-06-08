import React from "react";
import { Link } from "react-router-dom";

const TourTypesCard = ({ title, type, image, icon: Icon }) => {
  return (
    <Link
      to={`/packages/${type}`}
      style={{ backgroundImage: `url(${image})` }}
      className="h-full w-full bg-cover bg-center   rounded-2xl  flex items-center justify-center text-[#575FCF]  cursor-pointer"
    >
      <div className="flex flex-col  items-center">
        {Icon && <Icon className="text-4xl md:text-[80px]" />}
        <p className="font-bold text-sm md:text-3xl uppercase border-t mt-4">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default TourTypesCard;
