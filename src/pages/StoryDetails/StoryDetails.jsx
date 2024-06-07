import React from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const StoryDetails = () => {
  const { id } = useParams();

  const axiosCommon = useAxiosCommon();

  const currentPageUrl = `${window.location.href}`;
  console.log(currentPageUrl);

  // loading single story details
  const {
    data: story = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      const response = await axiosCommon(`/stories/${id}`);
      return response.data;
    },
  });
  const {
    _id,
    package_id,
    story_creator_email,
    story_creator_name,
    story_creator_image,
    story_text,
  } = story;

  // loading exact for the story

  const {
    data: singlePackage = {},
    isLoading: packageLoading,
    refetch: packageRefetch,
  } = useQuery({
    queryKey: ["singlePackage", package_id],
    queryFn: async () => {
      const response = await axiosCommon(`/package/${package_id}`);
      return response.data;
    },
    enabled: !!package_id,
  });
  const { title, photos } = singlePackage;
  return (
    <div className="">
      <h1 className="font-thin text-center text-3xl my-2">
        A story about <span className="text-orange-500">{title}</span>
      </h1>

      <div className="flex justify-center gap-4">
        {photos &&
          photos.map((photo) => {
            return (
              <div
                className="h-20 w-20 bg-center bg-cover  rounded-2xl "
                key={photo}
                style={{ backgroundImage: `url(${photo})` }}
              ></div>
            );
          })}
      </div>

      <div className="flex flex-col justify-center items-center border p-8 my-8">
        <div
          className="h-20 w-20 bg-center bg-cover  rounded-2xl "
          style={{ backgroundImage: `url(${story_creator_image})` }}
        ></div>
        <div className="text-center mb-4">
          <h1 className="font-bold text-xl">{story_creator_name}</h1>
          <p>{story_creator_email}</p>
        </div>
        <div className="border-t-2 border-black pt-6">
          <p className="font-thin text-xl">{story_text}</p>
        </div>
        <div>
          <div className="text-center my-4 font-bold">
            <h1>Share This Story On</h1>
          </div>
          <div className="flex justify-center gap-4">
            <FacebookShareButton url={currentPageUrl}>
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton url={currentPageUrl}>
              <TwitterIcon />
            </TwitterShareButton>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/all-stories" className="border p-2 ">
          All Stories
        </Link>
      </div>
    </div>
  );
};

export default StoryDetails;
