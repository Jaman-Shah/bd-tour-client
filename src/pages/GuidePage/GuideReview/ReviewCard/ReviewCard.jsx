import React from "react";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ review }) => {
  const { reviewer_name, reviewer_email, reviewer_image, rating, comment } =
    review;
  return (
    <div className="w-full flex border my-2 p-4">
      <div
        className="h-12 w-12 bg-cover bg-center rounded-full border-2 border-blue-400"
        style={{ backgroundImage: `url(${reviewer_image})` }}
      ></div>
      <div className="w-full ml-12">
        <h1 className="border-b font-bold mb-4 flex items-center">
          <FaStar className="text-green-500" /> : {rating}
        </h1>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
