import React from "react";
import useAxiosCommon from "./useAxiosCommon";
const axiosCommon = useAxiosCommon();

const saveUser = async (name, email, photo_url) => {
  const user = {
    name,
    email,
    photo_url,
    role: "tourist",
    status: "accepted",
    createdAt: Date.now(),
  };
  try {
    const response = await axiosCommon.post("/users", user);
    console.log(response.data);
  } catch (error) {
    console.log("error form creating user", error.message);
  }
};

const useSaveUser = () => {
  return saveUser;
};

export default useSaveUser;
