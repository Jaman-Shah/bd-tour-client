import React from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const GuideReview = ({ guideEmail }) => {
  const axiosCommon = useAxiosCommon();
  const {
    data: guidesReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guideReviews"],
    queryFn: async () => {
      const response = await axiosCommon(`/reviews/guides/${guideEmail}`);
      return response.data;
    },
    enabled: !!guideEmail,
    initialData: [],
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
