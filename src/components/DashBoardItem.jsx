import React from "react";
import { NavLink } from "react-router-dom";

const DashBoardItem = ({ link, label, icon: Icon, sideBarOpen }) => {
  return (
    <NavLink
      end
      to={link}
      className={({ isActive }) => {
        return `${isActive ? "bg-red-300" : ""} ${
          !sideBarOpen ? "pl-6 rounded-full" : "rounded-2xl"
        } flex items-center gap-4 p-2`;
      }}
    >
      {Icon && <Icon className="text-3xl" />}
      <p className="text-xl font-thin"> {sideBarOpen && label}</p>
    </NavLink>
  );
};

export default DashBoardItem;
