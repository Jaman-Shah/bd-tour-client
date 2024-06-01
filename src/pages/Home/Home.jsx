import React from "react";
import Slider from "./Slider/Slider";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";
import TourType from "./TourType/TourType";

const Home = () => {
  return (
    <div>
      <Slider />
      <TourismAndTravelGuide />
      <TourType />
    </div>
  );
};

export default Home;
