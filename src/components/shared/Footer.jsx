import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall, IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="p-10 bg-[#192a56] text-white mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="border-x rounded-3xl p-4">
          <h1 className="text-3xl font-bold mb-4">Logo</h1>
          <h1 className="font-bold text-4xl mb-4">Want to book a tour ? </h1>
          <button className="font-thin p-2 border rounded-full">
            Book Now
          </button>
        </div>
        <div className="border-x rounded-3xl p-4">
          <h1 className="text-3xl font-bold mb-4">Necessary Links</h1>
          <div className="font-bold space-y-4">
            <p>About Us</p>
            <p>Destination</p>
            <p>Packages</p>
            <p>Blogs</p>
          </div>
        </div>
        <div className="border-x rounded-3xl p-4">
          <h1 className="font-bold text-3xl mb-4">Contact Us </h1>
          <div className="space-y-4">
            <p className="flex items-center gap-4 font-bold ">
              <IoCall className="text-orange-500" /> ++ 99339933
            </p>
            <p className="flex items-center gap-4 font-bold">
              <IoMail className="text-orange-500" /> info@mail.com
            </p>
            <p className="flex items-center gap-4 font-bold">
              <FaLocationDot className="text-orange-500" />
              House 222, Rampura, Dhaka
            </p>
          </div>
        </div>
        <div className="border-x rounded-3xl p-4">
          <h1 className="font-bold text-3xl">Payment system</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
