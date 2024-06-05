import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure("/users");
      return response.data;
    },
  });
  return { users, isLoading, refetch };
};

export default useGetUsers;
