import React, { useState } from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import useGetGuides from "../../hooks/useGetGuides";
import useUser from "../../hooks/useUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import useGetBookings from "../../hooks/useGetBookings";

const BookingCreate = ({ id, title, price }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentGuideEmail, setCurrentGuideEmail] = useState("");
  const { currentUser } = useUser();
  const { guides } = useGetGuides();

  const axiosSecure = useAxiosSecure();

  const handleCurrentGuideEmail = (e) => {
    const currentGuide = guides.find((guide) => guide.name === e.target.value);
    setCurrentGuideEmail(currentGuide.email);
  };

  console.log(guides);
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const package_id = id; // this is getting form props
    const package_title = form.package_title.value;
    const tourist_name = form.tourist_name.value;
    const tourist_email = form.tourist_email.value;
    const tourist_image = form.tourist_image.value;
    const guide_name = form.guide_name.value;
    const guide_email = currentGuideEmail; //this is getting from state
    const package_price = form.package_price.value;
    const order_date = startDate; // this is getting form state
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
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you Want to Order this?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm ",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post(`/bookings`, booking).then((data) => {
            if (data.data.message) {
              return toast.error(`${data.data.message}`);
            }
            if (data.data.acknowledged && data.data.insertedId) {
              toast.success("Order Success");
            }
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <SectionHeader title="Book This Package" />
      <div>
        <form
          onSubmit={handleBookingSubmit}
          className="grid gap-2
       grid-cols-2 lg:grid-cols-3"
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
                guides.map((guide) => {
                  return (
                    <option key={guide.email} value={guide.name}>
                      {guide.name}
                    </option>
                  );
                })}
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
            <div className=" text-center">
              <DatePicker
                className="h-16 w-full border-x-2 p-2 rounded-xl"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <button type="submit" className="border-2 mt-4 border-green-500 p-4">
            Book This
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingCreate;
