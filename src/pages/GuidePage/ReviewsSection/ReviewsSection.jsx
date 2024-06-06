import React from "react";
import ReviewCard from "../GuideReview/ReviewCard/ReviewCard";

const ReviewsSection = ({ guidesReviews, isLoading }) => {
  console.log("guideReviews", guidesReviews);
  if (isLoading) {
    return "Loading.....";
  }

  if (guidesReviews.length < 1) return <h1>NO review</h1>;
  return (
    <div className="p-16 py-4">
      {guidesReviews &&
        guidesReviews.map((review) => {
          return <ReviewCard key={review._id} review={review} />;
        })}
    </div>
  );
};

export default ReviewsSection;
