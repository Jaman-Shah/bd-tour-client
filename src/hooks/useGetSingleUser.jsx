import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetSingleUser = (email) => {
  const axiosSecure = useAxiosSecure();
  const isEnabled = !!email;

  const {
    data: singleUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleUser"],
    queryFn: async () => {
      const response = await axiosSecure(`/user/${email}`);
      return response.data;
    },
    isEnabled: isEnabled,
  });
  return { singleUser, isLoading, refetch };
};

export default useGetSingleUser;
