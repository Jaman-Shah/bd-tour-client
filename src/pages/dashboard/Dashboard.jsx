import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashBoardItem from "../../components/DashBoardItem";
import { IoPersonCircleOutline, IoListCircle } from "react-icons/io5";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { FaHandHoldingHand } from "react-icons/fa6";
import { BsPatchPlusFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const { currentUser, refetch } = useUser();

  const axiosSecure = useAxiosSecure();

  // using tanstack query to update users

  // getting users  info with the help of useUser
  console.log("roleof current user", currentUser.role);

  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
    localStorage.setItem("sidebarOpen", `${!sideBarOpen}`);
  };

  useEffect(() => {
    setSideBarOpen(JSON.parse(localStorage.getItem("sidebarOpen")));
  }, []);

  // request to admin handler
  const handleRoleRequest = async () => {
    const response = await axiosSecure.put(
      `/updateuser?id=${currentUser._id}&role=${currentUser.role}&status=pending`
    );
    if (currentUser.status === "pending") {
      return toast.error("Already requested");
    }
    if (response.data.modifiedCount) {
      toast.success("Requested For Guide");
      refetch();
    }
  };

  return (
    <div>
      <div className="flex h-screen">
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
          <div className="flex min-h-screen  flex-col py-24 px-1 text-2xl">
            <DashBoardItem
              link="/dashboard"
              icon={IoPersonCircleOutline}
              label="Profile"
              sideBarOpen={sideBarOpen}
            />

            {currentUser.role === "tourist" ? (
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
                <button
                  onClick={handleRoleRequest}
                  className="p-2 border rounded-full mt-2 text-sm"
                >
                  Request to admin
                </button>
              </>
            ) : currentUser.role === "guide" ? (
              <DashBoardItem
                link="/dashboard/guide-assigned-tours"
                icon={FaHandHoldingHand}
                label="Assigned Tours"
                sideBarOpen={sideBarOpen}
              />
            ) : currentUser.role === "admin" ? (
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
          <div className="overflow-auto h-screen">
            {" "}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
