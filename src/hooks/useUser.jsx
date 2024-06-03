import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useUser = () => {
  const { user } = useAuth();

  const isEnabled = !!user;
  const initialData = user?.role || "";
  const axiosCommon = useAxiosCommon();

  const { data: currentUser, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return;
      }
      const response = await axiosCommon(`/user/${user.email}`);
      return response.data;
    },
    enabled: isEnabled,
    initialData: initialData,
  });

  return { currentUser, refetch };
};

export default useUser;
