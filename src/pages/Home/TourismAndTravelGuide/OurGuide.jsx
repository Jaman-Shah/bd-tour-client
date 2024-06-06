import React from "react";
import OurGuideCard from "../../../components/OurGuideCard";
import useGetGuides from "../../../hooks/useGetGuides";

const OurGuide = () => {
  const { guides, isLoading } = useGetGuides();
  console.log("guides are", guides);
  if (isLoading) return "Loading....";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {guides &&
        guides.map((guide) => {
          return <OurGuideCard guide={guide} key={guide._id} />;
        })}
    </div>
  );
};

export default OurGuide;
