import React, { useState } from "react";

const TourPlanSection = ({ tour_plans }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSetActiveIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-md mx-auto my-4">
      {tour_plans &&
        tour_plans.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => handleSetActiveIndex(index)}
              className="w-full text-left p-4 bg-gray-100 focus:outline-none"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{item.title}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </button>
            <div
              className={`${
                activeIndex === index ? "max-h-96 p-4" : "max-h-0"
              } overflow-hidden transition-max-height duration-300 ease-in-out bg-white`}
            >
              <p className="text-gray-600">{item.details}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TourPlanSection;
