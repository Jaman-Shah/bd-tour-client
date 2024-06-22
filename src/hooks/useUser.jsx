import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();

  console.log("Authenticated user:", user);

  const isEnabled = !!user;
  const initialData = user || "";
  const axiosSecure = useAxiosSecure();

  const {
    data: currentUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return;
      }
      const response = await axiosSecure(`/user/${user.email}`);
      console.log("API response:", response.data);
      return response.data;
    },
    enabled: isEnabled,
    initialData: initialData,
  });

  return { currentUser, refetch, isLoading };
};

export default useUser;
