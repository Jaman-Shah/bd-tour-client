import React from "react";
import ReactPlayer from "react-player";
import usePackages from "../../../hooks/usePackages";
const OverViewVideo = () => {
  const { packages } = usePackages();
  console.log(packages);
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
      <div className="p-8 w-full md:w-1/2  bg-green-500 rounded-3xl">
        <h1 className="font-bold text-3xl">Our Top Tours</h1>

        <ul>
          {packages &&
            packages.slice(0, 6).map((packageItem) => {
              return (
                <li className="text-xl font-bold " key={packageItem._id}>
                  {packageItem.title}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default OverViewVideo;
