import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetGuides = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: guides,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const response = await axiosCommon("/guides");
      return response.data;
    },
  });
  return { guides, isLoading, refetch };
};

export default useGetGuides;
