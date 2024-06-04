import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const usePackages = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: packages,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await axiosCommon("/packages");
      return response.data;
    },
  });
  return { packages, isLoading, refetch };
};

export default usePackages;
