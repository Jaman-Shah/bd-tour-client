import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsers = (name = "", role = "") => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", name, role],
    queryFn: async () => {
      const response = await axiosSecure(`/users?name=${name}&role=${role}`);
      return response.data;
    },
  });
  return { users, isLoading, refetch };
};

export default useGetUsers;
