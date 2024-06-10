import React from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GuideReview = ({ guideEmail }) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: guidesReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guideReviews", guideEmail],
    queryFn: async () => {
      const response = await axiosSecure(`/reviews/guides/${guideEmail}`);
      return response.data;
    },
    enabled: !!guideEmail,
  });
  if (isLoading) return "Loading..";
  return (
    <div>
      <SectionHeader title="Reviews Of this Guide" />
      <div>
        <h1 className="font-bold text-center text-xl">Leave A Review</h1>
        <ReviewForm guideEmail={guideEmail} refetch={refetch} />
        <ReviewsSection guidesReviews={guidesReviews} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default GuideReview;
