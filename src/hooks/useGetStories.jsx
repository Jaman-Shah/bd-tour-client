import React from "react";
import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useGetStories = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await axiosCommon("/stories");
      return response.data;
    },
  });
  return { stories, isLoading, refetch };
};

export default useGetStories;
