import React from "react";
import ReactPlayer from "react-player";
const OverViewVideo = () => {
  return (
    <div className="flex gap-3 h-full md:h-[320px] flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 bg-black ">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Z44fFqBQQtg"
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
      <div className="p-4 w-full md:w-1/2  bg-green-500 rounded-3xl">
        <h1 className="font-bold text-3xl">Our Top Tours</h1>

        <ul>
          <li>Sundarbans Mangrove Forest</li>
          <li>Cox's Bazar and Saint Martin's Island</li>
          <li>Sylhet Tea Gardens and Ratargul Swamp Forest</li>
          <li>Historical and Cultural Tour of Dhaka and Surroundings</li>
          <li>Bandarban Hill Tracts Tour</li>
        </ul>
      </div>
    </div>
  );
};
export default OverViewVideo;
