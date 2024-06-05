import React from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const DashboardGuideAssignedTours = () => {
  const { user } = useAuth();

  console.log("user is ", user);

  const isEnabled = !!user?.email;
  const initialData = [];
  const axiosSecure = useAxiosSecure();

  const {
    data: guideBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guideBookings", user?.email],
    queryFn: async () => {
      const response = await axiosSecure(`/bookings/guide/${user?.email}`);
      return response.data;
    },
    enabled: isEnabled,
    initialData: initialData,
  });

  // reusable function

  const changeStatus = async (id, status) => {
    const response = await axiosSecure.put(
      `/bookings?id=${id}&status=${status}`
    );
    return response.data;
  };

  const handleAccept = (id, status) => {
    changeStatus(id, status).then((result) => {
      if (result.acknowledged && result.modifiedCount) {
        toast.success(`This Booking is ${status}`);
      }
    });
    refetch();
  };
  const handleReject = (id, status) => {
    changeStatus(id, status).then((result) => {
      if (result.acknowledged && result.modifiedCount) {
        toast.success(`This Booking is ${status}`);
      }
    });
    refetch();
  };

  if (isLoading) return "Loading...";
  return (
    <div className="p-8">
      <div class="container mx-auto">
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow-md">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="py-3 px-4 text-left">Package</th>
                <th class="py-3 px-4 text-left">Tourist</th>
                <th class="py-3 px-4 text-left">Status</th>
                <th class="py-3 px-4 text-left"> Date</th>
                <th class="py-3 px-4 text-left"> Price</th>
                <th class="py-3 px-4 text-left">Change Status</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {guideBookings &&
                guideBookings.map((booking, index) => {
                  return (
                    <tr
                      key={user._id}
                      class={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-blue-600"
                      }`}
                    >
                      <td class="py-3 px-4">{booking.package_title}</td>
                      <td class="py-3 px-4">{booking.tourist_name}</td>
                      <td class="py-3 px-4 text-sm">{booking.status}</td>
                      <td class="py-3 px-4">{booking.order_date}</td>
                      <td class="py-3 px-4">{booking.package_price}</td>
                      <td class="flex justify-center items-center px-3 gap-8">
                        <button
                          onClick={() => handleAccept(booking._id, "Accepted")}
                          className="p-2 border-none rounded-lg bg-green-400"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(booking._id, "Rejected")}
                          className="p-2 border-none rounded-lg bg-red-400"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardGuideAssignedTours;
