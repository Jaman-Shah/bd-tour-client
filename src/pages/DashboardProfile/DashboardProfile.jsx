import React from "react";
import useUser from "../../hooks/useUser";

const DashboardProfile = () => {
  const { currentUser, refetch } = useUser();
  const { role, name, email, photo_url } = currentUser;
  console.log(currentUser);
  return (
    <div className="p-4">
      <div className="flex p-8 flex-col justify-center items-center rounded-3xl border-2 border-black">
        <div
          className="h-52 w-52 bg-cover bg-center rounded-full border-2 border-red-400"
          style={{ backgroundImage: `url(${photo_url})` }}
        ></div>
        <div className="text-center">
          <button className="uppercase border-2 p-2 mt-4 text-3xl border-black">
            {role}
          </button>
          <p className="font-bold text-2xl">{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <div>another</div>
    </div>
  );
};

export default DashboardProfile;
