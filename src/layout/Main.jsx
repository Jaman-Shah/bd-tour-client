import React from "react";
import Navbar from "../pages/shared/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
