import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../api/utils/photoUpload";
import { auth } from "../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import useSaveUser from "../../hooks/useSaveUser";
import ActionLoader from "../../components/shared/ActionLoader";

const Register = () => {
  const { createUser, signInWithGithub, loading, setLoading } = useAuth();
  const saveUser = useSaveUser();

  const [eyeOpen, setEyeOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // importing navigate function
  const navigate = useNavigate();

  // importing location function
  const location = useLocation();

  // register button functionality
  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, photo, password } = data;
    try {
      const uploadedPhotoUrl = await photoUpload(photo[0]);
      console.log(uploadedPhotoUrl, name, email, password);

      const result = await createUser(email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: uploadedPhotoUrl,
      });

      saveUser(name, email, uploadedPhotoUrl);
      setLoading(false);
      toast.success("Account Created Successfully");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use");
      } else {
        toast.error(error.message);
      }
      console.log(error.message);
      setLoading(false);
    }
  };

  // github popup login function
  const handleGithubLogin = () => {
    setLoading(true);
    signInWithGithub()
      .then((result) => {
        saveUser(
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        );
        toast.success("Login Success");
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Github Sign-In Failed");
        setLoading(false);
      });
  };

  return (
    <div className="bg-yellow-100 min-h-screen py-4 flex justify-center items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h1 className="text-center my-4 font-bold text-3xl">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Name:</label>
              <input
                className="w-full h-10 border border-black p-2"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-600">Name is required</p>}
            </div>
            <div>
              <label className="block mb-1 font-bold">Email:</label>
              <input
                className="w-full h-10 border border-black p-2"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-bold">Photo URL:</label>
              <input
                type="file"
                accept="image/*"
                className="w-full h-10 border border-black p-2"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-red-600">Photo is required</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-bold">Password:</label>
              <div className="relative">
                <input
                  type={eyeOpen ? "text" : "password"}
                  className="w-full h-10 border border-black p-2"
                  {...register("password", { required: true })}
                />
                <span className="absolute right-2 top-2 cursor-pointer">
                  {eyeOpen ? (
                    <BsFillEyeFill
                      className="text-2xl"
                      onClick={() => setEyeOpen(false)}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      className="text-2xl"
                      onClick={() => setEyeOpen(true)}
                    />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-600">Password is required</p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded"
              >
                {loading ? <ActionLoader /> : "Register"}
              </button>
            </div>
          </form>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={handleGithubLogin}
              className="w-full md:w-auto bg-black text-white py-2 px-4 rounded"
            >
              GitHub
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-300 p-4 md:p-8">
          <div className="text-center">
            <h1 className="font-bold text-3xl">Welcome To Register</h1>
            <h1 className="font-thin text-xl mb-3">Already Have an account?</h1>
            <Link to="/login" className="border rounded-full py-2 px-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
