import React from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import useGetStories from "../../hooks/useGetStories";
import StoryCard from "../Home/Stories/StoryCard/StoryCard";

const AllStories = () => {
  const { stories } = useGetStories();
  return (
    <div>
      <SectionHeader title="All Stories" />
      <div className="grid grid-cols-1 gap-4">
        {stories &&
          stories.map((story) => {
            return <StoryCard key={story._id} story={story} />;
          })}
      </div>
    </div>
  );
};

export default AllStories;
