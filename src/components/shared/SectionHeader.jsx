import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="my-10 text-center border-y border-black w-1/2 mx-auto">
      <h1 className="text-xl md:text-3xl mb-2 font-bold">{title}</h1>
    </div>
  );
};

export default SectionHeader;
