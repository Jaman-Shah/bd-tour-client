import React from "react";
import SectionHeader from "../../../components/shared/SectionHeader";
import useGetStories from "../../../hooks/useGetStories";
import StoryCard from "./StoryCard/StoryCard";

const Stories = () => {
  const { stories } = useGetStories();
  console.log("stories", stories);
  return (
    <div>
      <SectionHeader title="Lets See Tourists Stories " />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories &&
          stories.map((story) => {
            return <StoryCard key={story._id} story={story} />;
          })}
      </div>
    </div>
  );
};

export default Stories;
