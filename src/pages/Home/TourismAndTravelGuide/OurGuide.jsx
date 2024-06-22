import React from "react";
import { motion } from "framer-motion";
import OurGuideCard from "../../../components/OurGuideCard";
import useGetGuides from "../../../hooks/useGetGuides";

const OurGuide = () => {
  const { guides, isLoading } = useGetGuides();
 

  if (isLoading) return "Loading....";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10"
    >
      {guides &&
        guides.map((guide) => {
          return <OurGuideCard guide={guide} key={guide._id} />;
        })}
    </motion.div>
  );
};

export default OurGuide;
