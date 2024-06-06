import React from "react";
import useGetMyBookings from "../../hooks/useGetMyBookings";

const DashboardTouristBookings = () => {
  const { my_bookings } = useGetMyBookings();
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
                      <td class="py-3 px-4">{order_date}</td>
                      <td class="py-3 px-4">{package_price}</td>
                      <td class="py-3 px-4">{status}</td>
                      <td class="flex justify-center px-3 gap-8">
                        {status === "In Review" ? (
                          <button
                            onClick={() =>
                              handleUserRole(
                                booking._id,
                                "guide",
                                booking.email
                              )
                            }
                            className="p-2 border-none rounded-lg bg-yellow-400"
                          >
                            Cancel
                          </button>
                        ) : status === "Accepted" ? (
                          <button
                            onClick={() =>
                              handleUserRole(user._id, "admin", user.email)
                            }
                            className="p-2 border-none rounded-lg bg-green-400"
                          >
                            Pay
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleUserRole(user._id, "admin", user.email)
                            }
                            className="p-2 border-none rounded-lg bg-red-500"
                          >
                            Rejected
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
    </div>
  );
};

export default DashboardTouristBookings;
