import React, { useState } from "react";
import PhotoAddingModal from "../../components/PhotoAddingModal";
import PlansAddingModal from "../../components/PlansAddingModal";

const DashboardAdminAddPackage = () => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const openPhotoModal = () => {
    setIsPhotoModalOpen(true);
  };
  const openPlanModal = () => {
    setIsPlanModalOpen(true);
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
          Add Plans
        </button>
      </div>
      <form
        action=""
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
          />
        </div>
        <div>
          <p>Tour Type</p>
          <input
            type="text"
            placeholder="Tour Type"
            name="type"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
          />
        </div>
        <div>
          <p>Tour Price</p>
          <input
            type="number"
            placeholder="Tour Price"
            name="price"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
          />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <p>Tour Description</p>
          <textarea
            placeholder="Tour Description"
            name="description"
            className="h-20 w-full border-2 border-black p-2 rounded-xl"
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
        isPlanModalOpen={isPlanModalOpen}
        setIsPlanModalOpen={setIsPlanModalOpen}
      />
    </div>
  );
};

export default DashboardAdminAddPackage;
