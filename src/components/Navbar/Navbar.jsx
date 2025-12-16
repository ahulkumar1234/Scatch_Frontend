import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {

  const location = useLocation();

  if (location.pathname === "/owner" || location.pathname === "/ownerpanel") {
    return null; // navbar hide
  }


  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate()

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
      <nav className={`${isLoggedIn ? 'block' : 'hidden'} navbar flex justify-between items-center bg-gray-100 p-5 shadow-lg  w-full z-10 sticky`}>
        <h1 className="navbar-logo text-2xl text-blue-600 font-bold cursor-pointer">Scatch</h1>
        <div className="relative max-w-md mx-auto">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

          <input
            type="search"
            placeholder="Search your bag"
            className="
             w-full
             pl-12 pr-4 py-2
             rounded-full
             bg-gray-100
             text-gray-700
             placeholder-gray-400
             outline-none
             border border-gray-300
             transition-all
             shadow-sm
            "
          />
        </div>

        <div className="links flex justify-center items-center md:gap-4 gap-2.5 text-sm">
          <NavLink
            to='/home'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold "
                : "hover:text-blue-600 transition-all"
            }
          >
            Home
          </NavLink>

          <NavLink
            to='/shop'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold "
                : "hover:text-blue-600 transition-all"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold "
                : "hover:text-blue-600 transition-all"
            }
          >
            About
          </NavLink>

          <NavLink
            to='/cart'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold flex text-lg justify-center items-center"
                : "hover:text-blue-600 transition-all text-lg flex justify-center items-center"
            }
          >
            <span className="text-[15px]">Cart</span><FaShoppingCart />
          </NavLink>
          <button onClick={handelLogout} className="bg-red-500 px-1.5 py-1 text-sm md:px-3 md:py-1 rounded active:scale-95 transition-all duration-300 ease-in-out text-white cursor-pointer">Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar