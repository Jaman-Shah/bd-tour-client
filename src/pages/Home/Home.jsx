import React from "react";
import { motion } from "framer-motion";
import Slider from "./Slider/Slider";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";
import TourType from "./TourType/TourType";
import Stories from "./Stories/Stories";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Slider />
      <TourismAndTravelGuide />
      <TourType />
      <Stories />
    </motion.div>
  );
};

export default Home;
