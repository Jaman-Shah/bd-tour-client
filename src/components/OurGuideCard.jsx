import React from "react";
import { Link } from "react-router-dom";

const OurGuideCard = ({ guide, isLoading }) => {
  const { _id, name, email, photo_url } = guide;

  return (
    <div className="mb-6">
      <div className="h-full flex  flex-col justify-center items-center pt-[100px] text-white p-4 bg-[#3C40C6] border relative rounded-xl">
        <div className="font-bold rounded-2xl flex flex-col gap-4 border-t border-b p-2 pt-4 border-white">
          <h1 className="text-2xl  pl-4">{name}</h1>

          <p>{email}</p>
        </div>
        <Link to={`/guide/${_id}`} className="p-2 mt-2 rounded-full border">
          Details
        </Link>
        <div
          className="absolute -top-10 right-1/3 h-[100px] w-[100px] bg-cover bg-center rounded-2xl border-[6px] border-white"
          style={{
            backgroundImage: `url(${photo_url})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default OurGuideCard;
