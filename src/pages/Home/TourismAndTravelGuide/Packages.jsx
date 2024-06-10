import React from "react";
import usePackages from "../../../hooks/usePackages";
import PackagesCard from "../../../components/PackagesCard";
import { Link } from "react-router-dom";

const Packages = () => {
  const { packages, isLoading } = usePackages();

  return (
    <>
      <div
        className="grid gird-cols-1 md:grid-cols-3 gap-4
      "
      >
        {packages &&
          packages.slice(0, 3).map((item) => {
            return <PackagesCard key={item._id} item={item} />;
          })}
      </div>
      <div className="flex justify-center">
        <Link to="/all-packages" className="p-2 border border-black">
          See All
        </Link>
      </div>
    </>
  );
};

export default Packages;
