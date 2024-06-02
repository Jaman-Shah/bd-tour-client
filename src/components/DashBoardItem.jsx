import React from "react";
import { NavLink } from "react-router-dom";

const DashBoardItem = ({ link, label, icon: Icon, sideBarOpen }) => {
  return (
    <NavLink
      end
      to={link}
      className={({ isActive }) => {
        return `${isActive ? "bg-red-300" : ""} ${
          !sideBarOpen ? "rounded-full" : "rounded-2xl"
        } flex items-center gap-4 p-2 `;
      }}
    >
      {Icon && <Icon className="text-4xl" />}
      {sideBarOpen && label}
    </NavLink>
  );
};

export default DashBoardItem;
