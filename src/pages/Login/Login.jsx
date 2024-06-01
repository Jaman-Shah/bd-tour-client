import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = () => {
  const user = true;
  //   const { user, loginUser, signInWithGoogle } = useAuth();
  const [eyeOpen, setEyeOpen] = useState(false);
  console.log(user);
  const { register, handleSubmit } = useForm();

  // importing loginUser function from auth provider

  // importing navigate function
  const navigate = useNavigate();

  // importing location function
  const location = useLocation();

  // login button functionality
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        toast.success("Login Success");
        navigate(location.state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid credential");
        } else {
          toast.error("Login problem");
        }
      });
  };

  const onSubmit = (data) => console.log(data);

  // google popup login function
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Login Success");
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-yellow-100 h-screen w-full flex justify-center items-center">
      <div className="h-full md:h-2/3 w-full  md:w-2/3  flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-2/3 md:h-full rounded-l-3xl bg-white">
          <h1 className="text-center my-4 font-bold text-3xl">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <p className="mb-2 font-bold">Email : </p>
            <input
              className="w-full h-10 border border-black p-2 mb-4"
              {...register("email", { required: true })}
            />
            <p className="mb-2 font-bold">Password :</p>
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
                value="Sign In"
                className="border p-2 cursor-pointer"
              />
            </div>
          </form>
          <div className="flex justify-center gap-2">
            <button className="border p-2 border-black">Google</button>
            <button className="border p-2 border-black">Github</button>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/3 md:h-full flex justify-center items-center rounded-r-3xl bg-blue-300">
          <div className="text-center">
            <h1 className="font-bold text-3xl">Welcome To Login</h1>
            <h1 className="font-thin text-xl mb-3">Don't Have an account ?</h1>
            <Link to="/register" className="border rounded-full p-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
