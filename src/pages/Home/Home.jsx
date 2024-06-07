import React from "react";
import Slider from "./Slider/Slider";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";
import TourType from "./TourType/TourType";
import Stories from "./Stories/Stories";

const Home = () => {
  return (
    <div>
      <Slider />
      <TourismAndTravelGuide />
      <TourType />
      <Stories />
    </div>
  );
};

export default Home;
