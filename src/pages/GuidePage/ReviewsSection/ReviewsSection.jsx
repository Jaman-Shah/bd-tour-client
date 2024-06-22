import React from "react";
import ReviewCard from "../GuideReview/ReviewCard/ReviewCard";

const ReviewsSection = ({ guidesReviews, isLoading }) => {
  
  if (isLoading) {
    return "Loading.....";
  }

  if (guidesReviews.length < 1)
    return <h1 className="text-center my-4 font-bold">No review</h1>;
  return (
    <div className="p-4 md:p-16 py-4">
      {guidesReviews &&
        guidesReviews.map((review) => {
          return <ReviewCard key={review._id} review={review} />;
        })}
    </div>
  );
};

export default ReviewsSection;
