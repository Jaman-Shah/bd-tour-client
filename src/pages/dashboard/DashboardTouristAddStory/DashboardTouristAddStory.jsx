import React, { useEffect, useState } from "react";
import SectionHeader from "../../../components/shared/SectionHeader";
import useGetMyBookings from "../../../hooks/useGetMyBookings";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DashboardTouristAddStory = () => {
  const { my_bookings } = useGetMyBookings();
  const { currentUser } = useUser();
  const axiosSecure = useAxiosSecure();

  const [selectedName, setSelectedName] = useState("");
  const [selectedTour, setSelectedTour] = useState({});

  // finding which booking is selected in the option
  useEffect(() => {
    const result = my_bookings.find(
      (booking) =>
        booking.package_title.toLowerCase() === selectedName.toLowerCase()
    );
    setSelectedTour(result);
  }, [selectedName]);

  const handleCreateStory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const story_creator_name = currentUser.name;
    const story_creator_email = currentUser.email;
    const story_creator_image = currentUser.photo_url;
    const package_id = selectedTour.package_id;
    const tour_title = form.tour_title.value;
    const story_text = form.story_text.value;
    const story = {
      story_creator_name,
      story_creator_email,
      story_creator_image,
      package_id,
      tour_title,
      story_text,
    };
    try {
      const response = await axiosSecure.post(`/stories`, story);
      if (response.data.acknowledged && response.data.insertedId) {
        toast.success("Story Added Success");
        form.reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <SectionHeader title="Add A Story" />
      <form onSubmit={handleCreateStory}>
        <div>
          <p className="text-center">Add Story On</p>
          <select
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            name="tour_title"
            id=""
            onChange={(e) => setSelectedName(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select your tour
            </option>
            {my_bookings &&
              my_bookings.map((booking) => {
                return (
                  <option
                    key={booking.package_id}
                    value={booking.package_title}
                  >
                    {booking.package_title}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <p>Your Story</p>
          <textarea
            placeholder="Add Story"
            name="story_text"
            className="h-24 w-full border-2 border-black p-2 rounded-xl"
            required
          />
        </div>
        <div className="text-end px-16">
          <button type="submit" className="border w-full border-black p-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardTouristAddStory;
