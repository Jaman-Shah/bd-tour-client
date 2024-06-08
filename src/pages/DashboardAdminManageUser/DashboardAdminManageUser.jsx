import React, { useState, useEffect } from "react";
import SectionHeader from "./../../components/shared/SectionHeader";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAuth from "./../../hooks/useAuth";
import useGetUsers from "../../hooks/useGetUsers";
import Select from "react-select";

const DashboardAdminManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // passing values to custom hook
  const { users, isLoading, refetch } = useGetUsers(name, selectedRole);
  // react select options
  const options = [
    { value: "admin", label: "Admin" },
    { value: "guide", label: "Guide" },
    { value: "tourist", label: "Tourist" },
  ];

  const handleUserRole = async (id, role, email) => {
    if (email === user.email) {
      return toast.error("You Cannot Update Yourself");
    }
    const response = await axiosSecure.put(`/updateuser?id=${id}&role=${role}`);
    if (response.data.modifiedCount) {
      toast.success(`User updated to ${role}`);
      refetch();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    // const role = selectedRole.value;
    // setSelectedRole(role);
    setName(name);

    refetch();
  };

  if (isLoading) return "Loading.....";
  return (
    <div>
      <SectionHeader title="Manage Users" />
      <div className="container text-center  my-2 ">
        <h1 className="text-center  text-2xl mb-4">Search User</h1>
        <form
          onSubmit={handleSearch}
          className="flex items-center  justify-center gap-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="h-12 px-4"
          />
          <Select
            options={options}
            onChange={(selectedOption) => setSelectedRole(selectedOption.value)}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "grey" : "red",
                height: 50,
              }),
            }}
          />
          <button type="submit" className="h-12   bg-blue-500 px-2">
            Search
          </button>
        </form>
      </div>
      <div className="p-8">
        <div class="container mx-auto">
          <div class="overflow-x-auto overflow-y-auto">
            <table class="min-w-full bg-white rounded-lg shadow-md">
              <thead class="bg-blue-500 text-white">
                <tr>
                  <th class="py-3 px-4 text-left">Name</th>
                  <th class="py-3 px-4 text-left">Role</th>
                  <th class="py-3 px-4 text-left">Status</th>
                  <th class="py-3 px-4 text-left">Change To</th>
                </tr>
              </thead>
              <tbody className="font-bold">
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
                          <button
                            onClick={() =>
                              handleUserRole(user._id, "guide", user.email)
                            }
                            className="p-2 border-none rounded-lg bg-yellow-400"
                            disabled={user.role !== "tourist"}
                          >
                            Make Guide
                          </button>
                          <button
                            onClick={() =>
                              handleUserRole(user._id, "admin", user.email)
                            }
                            className="p-2 border-none rounded-lg bg-green-400"
                            disabled={user.role !== "tourist"}
                          >
                            Make Admin
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
