import React from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import usePackages from "../../hooks/usePackages";
import PackagesCard from "../../components/PackagesCard";

const AllPackages = () => {
  const { packages, isLoading } = usePackages();
  return (
    <div>
      <SectionHeader title="All Packages" />
      <div
        className="grid gird-cols-1 md:grid-cols-3 gap-4
      "
      >
        {packages &&
          packages.map((item) => {
            return <PackagesCard key={item._id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default AllPackages;
