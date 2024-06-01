import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
