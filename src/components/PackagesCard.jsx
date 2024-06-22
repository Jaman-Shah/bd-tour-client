import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import useAxiosCommon from "../hooks/useAxiosCommon";

const PackagesCard = ({ item }) => {
  const { currentUser } = useUser();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const { _id, title, type, price, description, photos } = item;

  const handleWishlist = async (id, email, title) => {
    if (!currentUser) {
      return navigate("/login");
    }
    try {
      const response = await axiosCommon.post(`/wishlists`, {
        package_id: id,
        package_title: title,
        email,
      });
      if (response.data.acknowledged && response.data.insertedId) {
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="h-52 relative bg-blue-200 mb-52 rounded-2xl">
        <div className="h-1/2"></div>
        <div
          className={`absolute h-3/4 w-1/2 top-0  transform translate-x-1/2 bg-pink-500 rounded-b-full bg-cover bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${photos})` }}
        >
          <FaRegHeart
            onClick={() => handleWishlist(_id, currentUser.email, title)}
            className="absolute cursor-pointer text-4xl text-red-600 right-0 bottom-0"
          />
        </div>
        <div className="absolute h-1/6 w-1/2 left-0 top-2/3 transform translate-y-1/2 bg-pink-500 rounded-r-full">
          <p className="font-bold text-2xl">{price}$ </p>
        </div>
        <div className="bg-[#34495e] text-white text-center pt-24 pb-8 px-8 rounded-b-2xl">
          <h1>Type: {type}</h1>
          <h1 className="text-2xl font-bold text-black"> {title}</h1>
          <p className="mb-6">{description.slice(0, 100) + ".............."}</p>
          <Link to={`/package/${_id}`} className="border p-2 rounded-full">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackagesCard;
