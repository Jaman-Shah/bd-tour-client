import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Ensure the base URL is correctly set
});

const useAxiosSecure = () => {
  const { signOutUser, setLoading } = useAuth();
  const navigate = useNavigate();

  // Request interceptor to add authorization header for every API call
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle 401 and 403 status errors
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401 || status === 403) {
        signOutUser();
        navigate("/login");
      }
      console.log("Status error:", status);
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
