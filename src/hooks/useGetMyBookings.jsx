import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUser from "./useUser";

const useGetMyBookings = () => {
  const { currentUser } = useUser();

  const axiosSecure = useAxiosSecure();
  const {
    data: my_bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my_bookings", currentUser?.email],
    queryFn: async () => {
      const response = await axiosSecure(`/bookings/${currentUser?.email}`);
      return response.data;
    },
    enabled: !!currentUser?.email,
  });
  return { my_bookings, isLoading, refetch };
};

export default useGetMyBookings;
