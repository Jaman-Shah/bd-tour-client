import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useSaveUser from "../../hooks/useSaveUser";
import ActionLoader from "../../components/shared/ActionLoader";

const Login = () => {
  const { loginUser, signInWithGithub, loading, setLoading } = useAuth();
  const saveUser = useSaveUser();

  const [eyeOpen, setEyeOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    loginUser(email, password)
      .then((result) => {
        toast.success("Login Success");
        navigate(from);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid credential");
        } else {
          toast.error("Login problem");
        }
      });
  };

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
        navigate(from);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Github Sign-In Failed");
        setLoading(false);
      });
  };

  return (
    <div className="bg-yellow-100 h-screen w-full flex justify-center items-center">
      <div className="h-full md:h-2/3 w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-2/3 md:h-full rounded-l-3xl bg-white">
          <h1 className="text-center my-4 font-bold text-3xl">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <p className="mb-2 font-bold">Email : </p>
            <input
              className="w-full h-10 border border-black p-2 mb-4"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            <p className="mb-2 font-bold">Password :</p>
            <div className="relative">
              <input
                type={eyeOpen ? "text" : "password"}
                className="w-full h-10 border border-black p-2 mb-4"
                {...register("password", { required: "Password is required" })}
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
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
            <div className="text-center">
              <button type="submit" className="border p-2 cursor-pointer">
                {loading ? <ActionLoader /> : "Sign In"}
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
            <h1 className="font-bold text-3xl">Welcome To Login</h1>
            <h1 className="font-thin text-xl mb-3">Don't Have an account?</h1>
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
