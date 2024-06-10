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
import DashboardProfile from "../pages/DashboardProfile/DashboardProfile";
import DashboardTouristBookings from "../pages/DashboardTouristBookings/DashboardTouristBookings";
import DashboardTouristWishList from "../pages/DashboardTouristWishList/DashboardTouristWishList";
import DashboardGuideAssignedTours from "../pages/DashboardGuideAssignedTours/DashboardGuideAssignedTours";
import DashboardAdminAddPackage from "../pages/DashboardAdminAddPackage/DashboardAdminAddPackage";
import DashboardAdminManageUser from "../pages/DashboardAdminManageUser/DashboardAdminManageUser";
import Dashboard from "./../pages/Dashboard/Dashboard";
import GuidePage from "../pages/GuidePage/GuidePage";
import StoryDetails from "../pages/StoryDetails/StoryDetails";
import AllStories from "../pages/AllStories/AllStories";
import PackagesByTypePage from "../pages/PackagesByTypePage/PackagesByTypePage";
import AllPackages from "../pages/AllPackages/AllPackages";
import ErrorPage from "./../components/ErrorPage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
        path: "/all-packages",
        element: <AllPackages />,
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
        path: "guide/:id",
        element: <GuidePage />,
      },
      {
        path: "/all-stories",
        element: <AllStories />,
      },
      {
        path: "/stories/:id",
        element: <StoryDetails />,
      },
      {
        path: "/packages/:type",
        element: <PackagesByTypePage />,
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
        ],
      },
    ],
  },
]);
