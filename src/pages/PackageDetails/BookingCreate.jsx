import React, { useState, useEffect } from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import useGetGuides from "../../hooks/useGetGuides";
import useUser from "../../hooks/useUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useGetBookingCount from "../../hooks/useGetBookingCount";
import Confetti from "react-confetti";

const BookingCreate = ({ id, title, price }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [currentGuideEmail, setCurrentGuideEmail] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { currentUser } = useUser();
  const { guides } = useGetGuides();
  const {
    bookingCount,
    refetch,
    isLoading: countLoading,
  } = useGetBookingCount();
  const [newBookingCount, setNewBookingCount] = useState(bookingCount);

  useEffect(() => {
    setNewBookingCount(bookingCount);
  }, [bookingCount]);

  const axiosSecure = useAxiosSecure();

  const handleCurrentGuideEmail = (e) => {
    const currentGuide = guides.find((guide) => guide.name === e.target.value);
    setCurrentGuideEmail(currentGuide.email);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: location } });
      return null;
    }
    const form = e.target;
    const package_id = id;
    const package_title = form.package_title.value;
    const tourist_name = form.tourist_name.value;
    const tourist_email = form.tourist_email.value;
    const tourist_image = form.tourist_image.value;
    const guide_name = form.guide_name.value;
    const guide_email = currentGuideEmail;
    const package_price = form.package_price.value;
    const order_date = startDate;

    const booking = {
      package_id,
      package_title,
      tourist_name,
      tourist_email,
      tourist_image,
      guide_name,
      guide_email,
      package_price,
      order_date,
      status: "In Review",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to order this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "green",
      confirmButtonText: "Confirm your Booking",
      cancelButtonText: "Go to your Bookings",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.post(`/bookings`, booking);
          if (data.message) {
            return toast.error(data.message);
          }
          if (data.acknowledged && data.insertedId) {
            await refetch();
            if (!countLoading) {
              if (newBookingCount + 1 === 3) {
                toast.success(
                  `Congratulations You have booked ${
                    newBookingCount + 1
                  } packages `
                );
                setShowConfetti(true);
              } else {
                toast.success("Order Success");
              }
              setNewBookingCount(newBookingCount + 1);
            }
          }
        } catch (error) {
          console.error(error.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "../dashboard/tourist-bookings";
      }
    });
  };

  return (
    <div>
      <SectionHeader title="Book This Package" />
      <div>
        <form
          onSubmit={handleBookingSubmit}
          className="grid gap-2 grid-cols-2 lg:grid-cols-3"
        >
          <div>
            <p>Tour Title</p>
            <input
              type="text"
              placeholder="Tour Title"
              name="package_title"
              defaultValue={title}
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              required
              disabled
            />
          </div>
          <div>
            <p>Your Name</p>
            <input
              type="text"
              placeholder="Tour Name"
              name="tourist_name"
              defaultValue={currentUser.name}
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              disabled
            />
          </div>
          <div>
            <p>Your Email</p>
            <input
              type="text"
              placeholder="Tour Title"
              name="tourist_email"
              defaultValue={currentUser.email}
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              disabled
            />
          </div>
          <div>
            <p>Your Image</p>
            <input
              type="text"
              placeholder="Your Image"
              name="tourist_image"
              defaultValue={currentUser.photo_url}
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              disabled
            />
          </div>

          <div>
            <p>Choose A Tour Guide</p>
            <select
              onChange={handleCurrentGuideEmail}
              name="guide_name"
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              required
            >
              <option value="" name="guide_name" selected disabled hidden>
                Choose A Tour Guide
              </option>
              {guides &&
                guides.map((guide) => (
                  <option key={guide.email} value={guide.name}>
                    {guide.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <p>Guide Email</p>
            <input
              type="text"
              placeholder="Guide Email"
              defaultValue={currentGuideEmail}
              name="guide_email"
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              required
            />
          </div>

          <div>
            <p>Tour Price</p>
            <input
              type="number"
              placeholder="Tour Price"
              defaultValue={price}
              name="package_price"
              className="h-16 w-full border-2 border-black p-2 rounded-xl"
              required
              disabled
            />
          </div>
          <div>
            <p className="text-center">Choose A Date</p>
            <div className="text-center">
              <DatePicker
                className="h-16 w-full border-x-2 p-2 rounded-xl"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <button type="submit" className="border-2 mt-4 border-green-500 p-4">
            Book Now
          </button>
        </form>

        {showConfetti && (
          <div
            id="confetti-container"
            className="fixed top-0 left-0 h-screen w-screen z-50 flex justify-center items-center"
          >
            <div className="p-12 bg-orange-400 rounded-3xl text-center">
              <p className="text-black font-bold text-4xl mb-4">
                Congratulations
                <p className="text-2xl"> You have booked 3 packages</p>
              </p>
              <button
                onClick={() => setShowConfetti(false)}
                className="border p-2 font-bold border-black  rounded-full"
              >
                Apply
              </button>
            </div>
            <Confetti />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCreate;
