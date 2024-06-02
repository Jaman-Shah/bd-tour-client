import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashBoardItem from "../../components/DashBoardItem";
import { CiHome } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  // getting users  info with the help of useUser

  const user = useUser();
  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
    localStorage.setItem("sidebarOpen", `${!sideBarOpen}`);
  };

  useEffect(() => {
    setSideBarOpen(JSON.parse(localStorage.getItem("sidebarOpen")));
  }, []);

  return (
    <div>
      <div className="h-screen flex">
        <div
          className={`relative ${
            sideBarOpen ? "w-1/5" : "w-1/24"
          } h-full bg-blue-400`}
        >
          <button
            onClick={handleSideBar}
            className="absolute text-center h-8 w-8 bg-blue-400 transition rounded-full border-2 -right-4 top-1/2"
          >
            {sideBarOpen ? "<" : ">"}
          </button>
          <div className="flex flex-col py-24 px-1 text-2xl transition delay-500">
            <DashBoardItem
              link="/dashboard"
              icon={IoPersonCircleOutline}
              label="Profile"
              sideBarOpen={sideBarOpen}
            />
            <DashBoardItem
              link="/dashboard/item3"
              icon={CiHome}
              label="Item3"
              sideBarOpen={sideBarOpen}
            />
          </div>
        </div>
        <div
          className={`${sideBarOpen ? "w-4/5" : "w-full"} h-full bg-gray-200`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
