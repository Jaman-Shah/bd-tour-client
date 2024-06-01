import React from "react";

const OurGuideCard = ({ item }) => {
  const { name, rating, desc, image } = item;

  return (
    <div>
      <div className="h-full  flex  flex-col justify-center items-center pt-[100px] text-white p-4 bg-[#3C40C6] border relative rounded-xl">
        <div className="font-bold rounded-2xl flex flex-col gap-4 border-t border-b pt-4 border-white">
          <h1 className="text-2xl  pl-4">{name}</h1>
          <p className=" pl-4">{desc}</p>
          <p>Rating: {rating}</p>
        </div>
        <button className="p-2 mt-2 rounded-full border">Details</button>
        <div
          className="absolute -top-10 right-1/3 h-[100px] w-[100px] bg-cover bg-center rounded-2xl border-[6px] border-white "
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default OurGuideCard;
