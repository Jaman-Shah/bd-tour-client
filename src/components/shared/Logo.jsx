import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.75C21 15.4177 18.3137 17.75 15 17.75C11.6863 17.75 9 15.4177 9 12.75C9 10.0823 11.6863 7.75 15 7.75C18.3137 7.75 21 10.0823 21 12.75Z"></path>
        <path d="M12 2.75L4.75 9.25L12 15.75L19.25 9.25L12 2.75Z"></path>
      </svg>
      <h1 className="text-xl md:text-2xl font-bold text-orange-500">BD Tour</h1>
    </div>
  );
};

export default Logo;
