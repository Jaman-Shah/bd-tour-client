import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const { auth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  console.log("login from useAuth", auth.user);
  return auth;
};

export default useAuth;
