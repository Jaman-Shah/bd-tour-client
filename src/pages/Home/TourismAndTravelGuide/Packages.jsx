import React from "react";
import PackagesCard from "../../../components/PackagesCard";

const Packages = () => {
  return (
    <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4].map((item, index) => {
        return <PackagesCard key={index} />;
      })}
    </div>
  );
};

export default Packages;
