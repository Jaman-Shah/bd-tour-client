import React from "react";
import SectionHeader from "./../../components/shared/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

const DashboardAdminManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure("/users");
      return response.data;
    },
  });

  console.log(users);

  if (isLoading) return "Loading.....";
  return (
    <div>
      <SectionHeader title="Manage Users" />
      <div className="p-8">
        <div class="container mx-auto">
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg shadow-md">
              <thead class="bg-blue-500 text-white">
                <tr>
                  <th class="py-3 px-4 text-left">Name</th>
                  <th class="py-3 px-4 text-left">Role</th>
                  <th class="py-3 px-4 text-left">Status</th>
                  <th class="py-3 px-4 text-left">Change To</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => {
                    return (
                      <tr
                        key={user._id}
                        class={`border-b border-gray-200 ${
                          index % 2 === 0 ? "bg-gray-300" : "bg-blue-600"
                        }`}
                      >
                        <td class="py-3 px-4">{user.name}</td>
                        <td class="py-3 px-4">{user.role}</td>
                        <td class="py-3 px-4">{user.status}</td>
                        <td class="flex justify-center px-3 gap-8">
                          <button className="p-2 border-2 rounded-lg bg-yellow-400">
                            Guide
                          </button>
                          <button className="p-2 border-2 rounded-lg bg-green-400">
                            Admin
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
    </div>
  );
};

export default DashboardAdminManageUser;
