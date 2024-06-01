import axios from "axios";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

export const photoUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  return data.data.display_url;
};
