import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../components/shared/PageLoader";
import useUser from "../hooks/useUser";

const AdminPrivateRouter = ({ children }) => {
  const { currentUser, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }
  if (!currentUser.role === "admin") {
    return <Navigate state={location.pathname} to="/" />;
  }
  return children;
};

export default AdminPrivateRouter;
