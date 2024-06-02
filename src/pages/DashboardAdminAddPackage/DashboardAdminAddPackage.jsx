import React, { useState } from "react";
import PhotoAddingModal from "../../components/PhotoAddingModal";
import PlansAddingModal from "../../components/PlansAddingModal";
import toast from "react-hot-toast";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const DashboardAdminAddPackage = () => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const openPhotoModal = () => {
    setIsPhotoModalOpen(true);
  };
  const openPlanModal = () => {
    setIsPlanModalOpen(true);
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const type = form.type.value;
    const price = parseInt(form.price.value);
    const description = form.description.value;
    const photos = photoUrls;
    const tour_plans = plans;
    const packageItem = {
      email: user?.email,
      title,
      type,
      price,
      description,
      photos,
      tour_plans,
    };
    if (photoUrls.length < 4 || plans.length < 2) {
      if (photoUrls.length < 4) {
        return toast.error("Insert More Than 3 photos");
      } else {
        return toast.error("Insert More than 1 plans");
      }
    }
    try {
      const response = await axiosSecure.post("/packages", packageItem);
      if (response.data.acknowledged) {
        toast.success("Package Is Added");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4">
      <div className="col-span-1 lg:col-span-3 gap-3 flex">
        <button
          onClick={openPhotoModal}
          className={`border grid ${
            photoUrls.length > 0 ? "grid-cols-8" : "grid-cols-1"
          } border-black p-4 w-full`}
        >
          {photoUrls &&
            photoUrls.map((url) => {
              return (
                <img
                  key={url}
                  src={url}
                  className="h-12 w-12"
                  alt="Uploaded Image"
                />
              );
            })}
          {photoUrls.length === 0 && "ADD PHOTOS"}
        </button>
        <button
          onClick={openPlanModal}
          className="border border-black p-4 w-full"
        >
          Add Plans ({`${plans.length}`})
        </button>
      </div>
      <form
        onSubmit={handlePackageSubmit}
        className="grid gap-2
       grid-cols-2 lg:grid-cols-3"
      >
        <div>
          <p>Tour Title</p>
          <input
            type="text"
            placeholder="Tour Title"
            name="title"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            required
          />
        </div>
        <div>
          <p>Tour Type</p>
          <select
            name="type"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            required
          >
            <option value="" selected disabled hidden>
              Choose Tour Type
            </option>
            <option value="hiking">HIKING</option>
            <option value="sports">SPORTS</option>
            <option value="walking">WALKING</option>
            <option value="wildlife">WILD LIFE</option>
            <option value="air_rides">AIR RIDES</option>
          </select>
        </div>
        <div>
          <p>Tour Price</p>
          <input
            type="number"
            placeholder="Tour Price"
            name="price"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            required
          />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <p>Tour Description</p>
          <textarea
            placeholder="Tour Description"
            name="description"
            className="h-20 w-full border-2 border-black p-2 rounded-xl"
            required
          />
        </div>
        <button type="submit" className="border-2 mt-4 border-green-500 p-4">
          ADD THIS PACKAGE
        </button>
      </form>

      <PhotoAddingModal
        loading={loading}
        setLoading={setLoading}
        photoUrls={photoUrls}
        setPhotoUrls={setPhotoUrls}
        isPhotoModalOpen={isPhotoModalOpen}
        setIsPhotoModalOpen={setIsPhotoModalOpen}
      />
      <PlansAddingModal
        plans={plans}
        setPlans={setPlans}
        isPlanModalOpen={isPlanModalOpen}
        setIsPlanModalOpen={setIsPlanModalOpen}
      />
    </div>
  );
};

export default DashboardAdminAddPackage;
