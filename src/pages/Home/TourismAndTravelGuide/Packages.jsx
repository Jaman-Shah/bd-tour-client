import React from "react";
import usePackages from "../../../hooks/usePackages";
import PackagesCard from "../../../components/PackagesCard";

const Packages = () => {
  const { packages, isLoading } = usePackages();

  return (
    <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
      {packages &&
        packages.map((item) => {
          return <PackagesCard key={item._id} item={item} />;
        })}
    </div>
  );
};

export default Packages;
