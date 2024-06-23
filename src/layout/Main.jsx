import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const Main = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <div className="mt-24 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
