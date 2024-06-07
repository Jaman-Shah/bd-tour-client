import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const ActionLoader = () => {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <BiLoaderAlt className="animate-spin text-2xl" />
    </div>
  );
};

export default ActionLoader;
