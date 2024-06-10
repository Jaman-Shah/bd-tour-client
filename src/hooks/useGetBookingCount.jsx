import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useUser from "./useUser";
import { useQuery } from "@tanstack/react-query";

const useGetBookingCount = () => {
  const { currentUser } = useUser();
  const axiosSecure = useAxiosSecure();
  const {
    data: bookingCount = 0,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookingCount", currentUser?.email],
    queryFn: async () => {
      const response = await axiosSecure(
        `/bookings/count/${currentUser.email}`
      );
      return response.data.count;
    },
    enabled: !!currentUser?.email,
  });
  return { bookingCount, isLoading, refetch };
};

export default useGetBookingCount;
