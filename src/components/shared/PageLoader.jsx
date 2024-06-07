import React from "react";
import { FiLoader } from "react-icons/fi";

const PageLoader = () => {
  // this is page loader
  return (
    <div className="max-h-screen animate-spin flex justify-center items-center">
      <FiLoader className="text-[120px] font-thin" />
    </div>
  );
};

export default PageLoader;
