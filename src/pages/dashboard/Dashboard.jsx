import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashBoardItem from "../../components/DashBoardItem";
import { IoPersonCircleOutline, IoListCircle } from "react-icons/io5";
import { RiListOrdered2 } from "react-icons/ri";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { FaHandHoldingHand } from "react-icons/fa6";
import { BsPatchPlusFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  // getting users  info with the help of useUser

  const user = useUser();
  console.log(user.role);
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
          <div className="flex flex-col py-24 px-1 text-2xl">
            <DashBoardItem
              link="/dashboard"
              icon={IoPersonCircleOutline}
              label="Profile"
              sideBarOpen={sideBarOpen}
            />

            {user.role === "tourist" ? (
              <>
                <DashBoardItem
                  link="/dashboard/tourist-bookings"
                  icon={TbSquareRoundedCheckFilled}
                  label="My Bookings"
                  sideBarOpen={sideBarOpen}
                />
                <DashBoardItem
                  link="/dashboard/tourist-wishlist"
                  icon={IoListCircle}
                  label="My Wishlist"
                  sideBarOpen={sideBarOpen}
                />
                <button className="p-2 border rounded-full mt-2 text-sm">
                  Request
                </button>
              </>
            ) : user.role === "guide" ? (
              <DashBoardItem
                link="/dashboard/guide-assigned-tours"
                icon={FaHandHoldingHand}
                label="Assigned Tours"
                sideBarOpen={sideBarOpen}
              />
            ) : user.role === "admin" ? (
              <>
                <DashBoardItem
                  link="/dashboard/admin-add-packages"
                  icon={BsPatchPlusFill}
                  label="Add Packages"
                  sideBarOpen={sideBarOpen}
                />
                <DashBoardItem
                  link="/dashboard/admin-manage-users"
                  icon={MdManageAccounts}
                  label="Manage Users"
                  sideBarOpen={sideBarOpen}
                />
              </>
            ) : null}
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
