import React from "react";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  const {
    _id,
    tour_title,
    story_creator_email,
    story_creator_name,
    story_creator_image,
    story_text,
  } = story;
  return (
    <Link
      to={`/stories/${_id}`}
      className="cursor-pointer border flex hover:bg-red-200 rounded-2xl"
    >
      {/* left side  */}
      <div className="p-4 flex flex-col items-center justify-center">
        <div
          className="h-24 w-24 bg-cover bg-center"
          style={{ backgroundImage: `url(${story_creator_image})` }}
        ></div>
        <div className="border-r-2 border-green-400 p-4 text-center">
          <h1>{story_creator_name}</h1>
          <p>{story_creator_email}</p>
        </div>
      </div>

      {/* right side  */}
      <div className="p-4">
        <h1 className="border-b-2 border-black  p-4 text-2xl">
          Excited Visiting: <span className="text-green-500">{tour_title}</span>
        </h1>
        <p>{story_text.slice(0, 400) + ".............."}</p>
      </div>
    </Link>
  );
};

export default StoryCard;
