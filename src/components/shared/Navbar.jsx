import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaPeopleRoof, FaBloggerB } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import useAuth from "./../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { user, setUser, signOutUser, setLoading } = useAuth();
  const navigate = useNavigate();

  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const changeNavbarBg = () => {
    if (window.scrollY >= 90) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  window.addEventListener("scroll", changeNavbarBg);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        toast.success("Successfully signed out");
        navigate("/");
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activeClass = ({ isActive }) =>
    `hover:text-black hover:rounded-xl ${
      isActive ? "text-black font-bold" : "text-orange-500 text-[#ffa801]"
    }`;

  return (
    <nav
      x-data="{ isOpen: false }"
      className={`fixed w-full transform top-0 z-10 ${
        navbarBg ? "bg-[#575fcf]" : "bg-[#3c40c6]"
      } shadow`}
    >
      <div className="px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-orange-500">
              Tourist Guide
            </h1>
          </Link>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-black-500 hover:text-black dark:hover:text-black focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-green-500 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="flex relative items-center gap-10 flex-col md:flex-row md:mx-6">
            <NavLink to="/" className={activeClass}>
              <div className="flex flex-col items-center">
                <IoHomeOutline
                  className={`${activeClass} text-xl rounded-full`}
                />
                <h3 className="text-sm">Home</h3>
              </div>
            </NavLink>
            <NavLink to="/community" className={activeClass}>
              <div className="flex flex-col items-center">
                <FaPeopleRoof
                  className={`${activeClass} text-xl rounded-full`}
                />
                <h3 className="text-sm">Community</h3>
              </div>
            </NavLink>
            <NavLink to="/blogs" className={activeClass}>
              <div className="flex flex-col items-center">
                <FaBloggerB className={`${activeClass} text-xl rounded-full`} />
                <h3 className="text-sm">Blogs</h3>
              </div>
            </NavLink>
            <NavLink to="/about-us" className={activeClass}>
              <div className="flex flex-col items-center">
                <BsFillQuestionSquareFill
                  className={`${activeClass} text-xl rounded-full`}
                />
                <h3 className="text-sm">About Us</h3>
              </div>
            </NavLink>
            <NavLink to="/contact-us" className={activeClass}>
              <div className="flex flex-col items-center">
                <RiContactsLine
                  className={`${activeClass} text-xl rounded-full`}
                />
                <h3 className="text-sm">Contact Us</h3>
              </div>
            </NavLink>
            <div className="flex gap-4 items-center flex-col md:flex-row">
              {user ? (
                <div className="flex gap-4">
                  <button onClick={toggleProfile}>
                    <img
                      src={user.photoURL}
                      className="text-red-500 h-8 w-8 text-3xl border-2 border-white rounded-full"
                      alt="User Profile"
                    />
                  </button>
                  <button onClick={handleSignOutUser}>
                    <AiOutlineLogout className="text-3xl text-red-500" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Link
                    to="/login"
                    className="p-1 border rounded-xl text-sm text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="p-1 border rounded-xl text-sm text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`${
                showProfileMenu ? "absolute" : "hidden"
              } md:-bottom-[200px] right-0 top-10 bg-green-300 border-2 shadow-2xl border-black p-4  rounded-2xl`}
            >
              <div className="flex flex-col gap-1">
                <Link
                  onClick={toggleProfile}
                  to="/dashboard"
                  className="p-2 font-bold rounded-2xl bg-gray-500 text-white"
                >
                  Dashboard
                </Link>
                <Link
                  onClick={toggleProfile}
                  to="/addafood"
                  className="p-2 font-bold rounded-2xl bg-gray-500 text-white"
                >
                  Offer Announcement
                </Link>
                <p className="p-2 font-bold rounded-2xl text-black">
                  {user?.displayName}
                </p>
                <p className="p-2 font-bold rounded-2xl text-black">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:block"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
