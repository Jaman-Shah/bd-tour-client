import React from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PackagesCard from "../../components/PackagesCard";
import SectionHeader from "../../components/shared/SectionHeader";

const PackagesByTypePage = () => {
  const axiosCommon = useAxiosCommon();
  const { type } = useParams();
  console.log("type", type);
  const {
    data: packagesByType = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["packagesByType", type],
    queryFn: async () => {
      const response = await axiosCommon(`/packages/${type}`);
      return response.data;
    },
    enabled: !!type,
  });
  return (
    <>
      <div>
        <SectionHeader title={`Packages Of Category: ${type}`} />
      </div>
      <div className="grid gird-cols-1 md:grid-cols-3 gap-4 p-4 pb-8">
        {packagesByType &&
          packagesByType.map((item) => {
            return <PackagesCard key={item._id} item={item} />;
          })}
      </div>
    </>
  );
};

export default PackagesByTypePage;
