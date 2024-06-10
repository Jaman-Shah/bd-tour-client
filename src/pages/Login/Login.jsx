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
    <div className="bg-yellow-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h1 className="text-center my-4 font-bold text-3xl">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Email:</label>
              <input
                className="w-full h-10 border border-black p-2"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-bold">Password:</label>
              <div className="relative">
                <input
                  type={eyeOpen ? "text" : "password"}
                  className="w-full h-10 border border-black p-2"
                  {...register("password", {
                    required: "Password is required",
                  })}
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
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded"
              >
                {loading ? <ActionLoader /> : "Sign In"}
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
            <h1 className="font-bold text-3xl">Welcome To Login</h1>
            <h1 className="font-thin text-xl mb-3">Don't Have an account?</h1>
            <Link to="/register" className="border rounded-full py-2 px-4">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
