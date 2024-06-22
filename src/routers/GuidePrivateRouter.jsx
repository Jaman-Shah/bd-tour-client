import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../components/shared/PageLoader";
import useUser from "../hooks/useUser";

const GuidePrivateRouter = ({ children }) => {
  const { currentUser, isLoading } = useUser();
  const location = useLocation();
  console.log("current user is", currentUser);
  if (isLoading) {
    return <PageLoader />;
  }
  if (!currentUser.role === "guide") {
    return <Navigate state={location.pathname} to="/" />;
  }
  return children;
};

export default GuidePrivateRouter;
