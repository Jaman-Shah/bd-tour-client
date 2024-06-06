import React from "react";
import toast from "react-hot-toast";
import useUser from "../../../hooks/useUser";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const ReviewForm = ({ guideEmail, refetch }) => {
  const { currentUser } = useUser();
  const axiosCommon = useAxiosCommon();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const rating = parseInt(form.rating.value);
    const reviewer_name = currentUser.name;
    const reviewer_email = currentUser.email;
    const reviewer_image = currentUser.photo_url;
    const guide_email = guideEmail;
    const review = {
      comment,
      rating,
      guide_email,
      reviewer_name,
      reviewer_email,
      reviewer_image,
    };
    if (guide_email === reviewer_email)
      return toast.error("You cannot Review Yourself");
    if (rating == "0") return toast.error("Add Raging");
    try {
      const response = await axiosCommon.post(`/reviews/guides`, review);
      if (response.data.acknowledged && response.data.insertedId) {
        toast.success("Review Added Success");
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleReviewSubmit}>
        <div className="flex p-16 py-2 gap-2">
          <div className=" w-4/5 h-full">
            <h1 className="font-bold mb-4">Comment :</h1>
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Leave A comment...."
              className=" h-24 p-8  w-full border border-black"
              required
            />
          </div>
          <div className=" w-1/5 h-full">
            <h1 className="font-bold mb-4">Rating :</h1>
            <select
              name="rating"
              id=""
              className="h-24 w-full border border-black text-center font-thin text-[34px]"
              required
            >
              <option value="0">Add Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="text-end px-16 ">
          <button type="submit" className="border w-full border-black p-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
