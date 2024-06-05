import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DashboardTouristWishList = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();

  const isEnabled = !!currentUser;
  const initialData = currentUser || "";
  const {
    data: wishlists,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const response = await axiosSecure(`/wishlists/${currentUser.email}`);
      return response.data;
    },
    enabled: isEnabled,
    initialData: initialData,
  });

  const handleDeleteWishlist = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you Want to Delete this?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm ",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/wishlist/${id}`).then((data) => {
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

  if (isLoading) return "Loading...";
  return (
    <div className="p-8">
      <div class="container mx-auto">
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow-md">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="py-3 px-4 text-left">Name</th>
                <th class="py-3 px-4 text-left">Delete</th>
                <th class="py-3 px-4 text-left">Visit Details </th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {wishlists &&
                wishlists.map((wishlist, index) => {
                  return (
                    <tr
                      key={wishlist._id}
                      class={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-blue-600"
                      }`}
                    >
                      <td class="py-3 px-4">{wishlist.package_title}</td>
                      <td class="py-3 px-4">
                        <button
                          onClick={() => handleDeleteWishlist(wishlist._id)}
                          className="p-2 border-none rounded-lg bg-red-400"
                        >
                          Delete
                        </button>
                      </td>
                      <td class="py-3 px-4">
                        <Link
                          to={`/package/${wishlist.package_id}`}
                          className="p-2 border-none rounded-lg bg-green-400"
                        >
                          Visit Details
                        </Link>
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

export default DashboardTouristWishList;
