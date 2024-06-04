import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Community from "../pages/Community/Community";
import Blogs from "../pages/Blogs/Blogs";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardProfile from "../pages/DashboardProfile/DashboardProfile";
import DashboardTouristBookings from "../pages/DashboardTouristBookings/DashboardTouristBookings";
import DashboardTouristWishList from "../pages/DashboardTouristWishList/DashboardTouristWishList";
import DashboardGuideAssignedTours from "../pages/DashboardGuideAssignedTours/DashboardGuideAssignedTours";
import DashboardAdminAddPackage from "../pages/DashboardAdminAddPackage/DashboardAdminAddPackage";
import DashboardAdminManageUser from "../pages/DashboardAdminManageUser/DashboardAdminManageUser";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/package/:id",
        element: <PackageDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashboardProfile />,
          },
          {
            path: "tourist-bookings",
            element: <DashboardTouristBookings />,
          },
          {
            path: "tourist-wishlist",
            element: <DashboardTouristWishList />,
          },
          {
            path: "guide-assigned-tours",
            element: <DashboardGuideAssignedTours />,
          },
          {
            path: "admin-add-packages",
            element: <DashboardAdminAddPackage />,
          },
          {
            path: "admin-manage-users",
            element: <DashboardAdminManageUser />,
          },
          {},
        ],
      },
    ],
  },
]);
