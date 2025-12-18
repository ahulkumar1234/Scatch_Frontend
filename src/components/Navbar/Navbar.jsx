import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { FaBars } from "react-icons/fa";


const Navbar = () => {

  const location = useLocation();

  if (location.pathname === "/") {
    return null; // navbar hide
  }

  const [menuopen, setmenuOpen] = useState(false);


  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate()

  if (!isLoggedIn) return null;

  const handelLogout = async () => {
    try {
      const res = await axios.post('https://scatch-backend-41mw.onrender.com/api/v1/users/logout',
        {},
        {
          withCredentials: true
        }
      );
      toast.success(res.data.message);
      // window.confirm('Are you sure! Do you want to logout');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!')
    }

  };

  return (
    <>
      <nav className={`${isLoggedIn ? "block" : "hidden"} fixed top-0 left-0 w-full z-60 bg-gray-100 shadow-md`}>
        <div className="flex justify-between items-center h-17 p-4 md:p-5">

          {/* Logo */}
          <h1 className="text-2xl text-blue-600 font-bold cursor-pointer">
            Scatch
          </h1>

          {/* Search (Desktop only) */}
          <div className="relative hidden md:block">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
            <input
              type="search"
              placeholder="Search your bag"
              className="w-[250px] pl-9 pr-4 py-1.5 border border-gray-400 rounded outline-none"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 text-md">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600 transition-all"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600 transition-all"
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600 transition-all"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold flex items-center gap-1"
                  : "hover:text-blue-600 transition-all flex items-center gap-1"
              }
            >
              Cart <FaShoppingCart />
            </NavLink>

            <button
              onClick={handelLogout}
              className="bg-red-500 px-3 py-1 rounded text-white active:scale-95 transition-all ease-in-out duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>

          {/* Hamburger (Mobile only) */}
          <FaBars
            className="text-2xl md:hidden cursor-pointer"
            onClick={() => setmenuOpen(true)}
          />
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center gap-8 text-2xl transform transition-transform duration-300
         ${menuopen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Close Icon */}
          <RxCross1
            className="absolute top-5 right-5 text-2xl cursor-pointer"
            onClick={() => setmenuOpen(false)}
          />

          <NavLink
            to="/home"
            onClick={() => setmenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition-all"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            onClick={() => setmenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition-all"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setmenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition-all"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setmenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold flex items-center gap-2"
                : "hover:text-blue-500 transition-all flex items-center gap-2"
            }
          >
            Cart <FaShoppingCart />
          </NavLink>

          <button
            onClick={handelLogout}
            className="bg-red-500 px-5 py-1.5 rounded text-lg active:scale-95 transition-all ease-in-out duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>


    </>
  )
}

export default Navbar
