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
  const { user, createUser, signInWithGithub, loading, setLoading } = useAuth();
  const saveUser = useSaveUser();

  const [eyeOpen, setEyeOpen] = useState(false);
  console.log(user);
  const { register, handleSubmit } = useForm();

  // importing navigate function
  const navigate = useNavigate();

  // importing location function
  const location = useLocation();

  // register button functionality
  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, photo, password } = data;
    // console.log(name, email, photo[0], password);
    try {
      const uploadedPhotoUrl = await photoUpload(photo[0]);
      console.log(uploadedPhotoUrl, name, email, password);

      try {
        createUser(email, password).then((result) => {
          // Adding user profile update
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: uploadedPhotoUrl,
          }).then(() => {
            saveUser(name, email, uploadedPhotoUrl);
            setLoading(false);
            toast.success("Account Created Successfully");
            navigate("/");
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message, "photo UploadError");
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
    <div className="bg-yellow-100 h-screen w-full py-4 flex justify-center items-center">
      <div className="h-full md:h-3/3 w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-2/3 md:h-full rounded-l-3xl bg-white">
          <h1 className="text-center my-4 font-bold text-3xl">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <p className="mb-2 font-bold">Name:</p>
            <input
              className="w-full h-10 border border-black p-2 mb-4"
              {...register("name", { required: true })}
            />
            <p className="mb-2 font-bold">Email:</p>
            <input
              className="w-full h-10 border border-black p-2 mb-4"
              {...register("email", { required: true })}
            />
            <p className="mb-2 font-bold">Photo URL:</p>
            <input
              type="file"
              accept="image/*"
              className="w-full h-10 border border-black p-2 mb-4"
              {...register("photo", { required: true })}
            />
            <p className="mb-2 font-bold">Password:</p>
            <div className="relative">
              <input
                type={eyeOpen ? "text" : "password"}
                className="w-full h-10 border border-black p-2 mb-4"
                {...register("password", { required: true })}
              />
              <span className="absolute right-2 top-2">
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
            <div className="text-center">
              <button type="submit" className="border p-2 cursor-pointer">
                {loading ? <ActionLoader /> : "Register"}
              </button>
            </div>
          </form>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleGithubLogin}
              className="border p-2 border-black"
            >
              GitHub
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/3 md:h-full flex justify-center items-center rounded-r-3xl bg-blue-300">
          <div className="text-center">
            <h1 className="font-bold text-3xl">Welcome To Register</h1>
            <h1 className="font-thin text-xl mb-3">Don't Have an account?</h1>
            <Link to="/login" className="border rounded-full p-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
