import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetBookings = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await axiosSecure("/users");
      return response.data;
    },
  });
  return { bookings, isLoading, refetch };
};

export default useGetBookings;
