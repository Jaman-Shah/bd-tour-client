import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import ImagesSection from "./ImagesSection";
import SectionHeader from "../../components/shared/SectionHeader";
import AboutTheTour from "./AboutTheTour";
import TourPlanSection from "./TourPlanSection";
import BookingCreate from "./BookingCreate";
import TourGuideSection from "./TourGuideSection";

const PackageDetails = () => {
  const { id } = useParams();
  const isEnabled = !!id;
  const initialData = id || "";

  const axiosCommon = useAxiosCommon();
  const {
    data: packageItem,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["packageItem", id],
    queryFn: async () => {
      const response = await axiosCommon(`/package/${id}`);
      return response.data;
    },
    enabled: isEnabled,
    initialData: initialData,
  });

  const { _id, photos, title, price, description, tour_plans } = packageItem;
  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
      <SectionHeader title={title} />
      <ImagesSection photos={photos} />
      <AboutTheTour description={description} />
      <TourPlanSection tour_plans={tour_plans} />
      <TourGuideSection />
      <BookingCreate id={_id} title={title} price={price} />
    </>
  );
};

export default PackageDetails;
