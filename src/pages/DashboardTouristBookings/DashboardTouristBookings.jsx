import React, { useEffect, useState } from "react";
import useGetMyBookings from "../../hooks/useGetMyBookings";
import PaymentModal from "../../components/PaymentModal";
import ActionLoader from "./../../components/shared/ActionLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const DashboardTouristBookings = () => {
  const { my_bookings, isLoading, refetch } = useGetMyBookings();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState({});

  const handleModalOpen = (booking) => {
    setIsModalOpen(true);
    setBooking(booking);
  };

  const handleCancel = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you Want to Cancel Booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "No ",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/booking/${id}`).then((data) => {
            if (data.data.acknowledged && data.data.deletedCount) {
            }
            toast.success("Delete Success");
            refetch();
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) return <ActionLoader />;
  return (
    <div className="p-8">
      <div class="container mx-auto">
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow-md">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="py-3 px-4 text-left">Name</th>
                <th class="py-3 px-4 text-left">Tour Guide</th>
                <th class="py-3 px-4 text-left">Date</th>
                <th class="py-3 px-4 text-left">Price</th>
                <th class="py-3 px-4 text-left">Status</th>
                <th class="py-3 px-4 text-left">Pay</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {my_bookings &&
                my_bookings.map((booking, index) => {
                  const {
                    package_title,
                    guide_name,
                    order_date,
                    status,
                    package_price,
                  } = booking;
                  return (
                    <tr
                      key={booking._id}
                      class={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-yellow-300"
                      }`}
                    >
                      <td class="py-3 px-4">{package_title}</td>
                      <td class="py-3 px-4">{guide_name}</td>
                      <td class="py-3 px-4">
                        {new Date(order_date).toLocaleDateString()}
                      </td>
                      <td class="py-3 px-4">{package_price}</td>
                      <td class="py-3 px-4">{status}</td>
                      <td class="flex justify-center px-3 gap-8">
                        {status === "In Review" ? (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="p-2 border-none rounded-lg bg-yellow-400"
                          >
                            Cancel
                          </button>
                        ) : status === "Accepted" ? (
                          <button
                            onClick={() => handleModalOpen(booking)}
                            className="p-2 border-none rounded-lg bg-green-400"
                          >
                            Pay
                          </button>
                        ) : status === "Rejected" ? (
                          <button className="p-2 border-none rounded-lg bg-red-500">
                            Rejected
                          </button>
                        ) : (
                          <button
                            className="p-2 border-none rounded-lg bg-blue-500"
                            disabled
                          >
                            Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {booking && !isLoading && (
        <PaymentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          booking={booking}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default DashboardTouristBookings;
