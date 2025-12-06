import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

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
      // alert('Are you sure! Do you want to logout');

      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!')
    }

  };

  return (
    <>
      <nav className={`${isLoggedIn ? 'block' : 'hidden'} navbar flex justify-between items-center bg-gray-100 h-[10vh] p-5 shadow-lg fixed w-full z-10`}>
        <h1 className="navbar-logo text-2xl text-blue-600 font-bold cursor-pointer">Scatch</h1>
        <div className="links">
          <NavLink
            to='/shop'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold mx-2.5"
                : "mx-2.5 hover:text-blue-600 transition-all"
            }
          >
            Home
          </NavLink>

          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold mx-2.5"
                : "mx-2.5 hover:text-blue-600 transition-all"
            }
          >
            About
          </NavLink>

          <NavLink
            to='/cart'
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold mx-2.5"
                : "mx-2.5 hover:text-blue-600 transition-all"
            }
          >
            Cart
          </NavLink>
          <button onClick={handelLogout} className="text-red-600 mx-2.5 cursor-pointer">Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar