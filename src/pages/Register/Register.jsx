import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { photoUpload } from "../../api/utils/photoUpload";
import { auth } from "../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { user, createUser, signInWithGoogle, loading, setLoading } = useAuth();
  const [photoUrl, setPhotoUrl] = useState("");

  const [eyeOpen, setEyeOpen] = useState(false);
  console.log(user);
  const { register, handleSubmit } = useForm();

  // importing navigate function
  const navigate = useNavigate();

  // importing location function
  const location = useLocation();

  // register button functionality
  const onSubmit = async (data) => {
    const { name, email, photo, password } = data;
    console.log(name, email, photo[0], password);

    if (!photo || photo.length === 0) {
      return toast.error("Please upload an image");
    }

    try {
      setLoading(true);

      // Create user
      const result = await createUser(email, password);
      const currentUser = result.user;

      try {
        // Upload photo
        if (currentUser) {
          setLoading(true);
          const photo_url = await photoUpload(photo[0]);
          setPhotoUrl(photo_url);
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo_url,
          });

          toast.success("Account Created Successfully");
          navigate("/");
          setLoading(false);
        } else {
          return toast.error("Failed Creating User");
        }
        // Update profile
      } catch (photoUploadError) {
        toast.error("Photo Upload Failed");
      } finally {
        setLoading(false);
      }
    } catch (createUserError) {
      console.log(createUserError);
      if (createUserError.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else {
        toast.error("An error occurred while creating the user.");
      }
      setLoading(false);
    }
  };

  // google popup login function
  const handleGoogleLogIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        toast.success("Login Success");
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google Sign-In Failed");
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
              <input
                type="submit"
                value={loading ? "Loading..." : "Register"}
                className="border p-2 cursor-pointer"
              />
            </div>
          </form>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleGoogleLogIn}
              className="border p-2 border-black"
            >
              Google
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
