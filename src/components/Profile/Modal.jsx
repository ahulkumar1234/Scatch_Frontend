import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import ClipLoader from "react-spinners/ClipLoader";
import { useProfile } from "../../Context/ProfileContext";


const Modal = () => {
  const { closeProfile } = useProfile();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handelLogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://scatch-backend-41mw.onrender.com/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out");
      setIsLoggedIn(false);
      closeProfile();
      navigate("/");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-[9999] top-20 right-10 w-[200px] p-5 flex flex-col justify-center items-center h-[130px] bg-white rounded-lg shadow-lg space-y-2">
      <RxCross1
        className="absolute top-2 right-2 cursor-pointer text-gray-500"
        onClick={closeProfile}
      />

      <button
        onClick={() => {
          closeProfile();
          navigate("/profile");
        }}
        className="w-full flex justify-center active:scale-95 transition-all ease-in-out duration-200 items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer px-3 py-1"
      >
        <FaUser /> Profile
      </button>

      <button
        onClick={handelLogout}
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 px-3 py-1 cursor-pointer rounded text-white ${
          loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
        }`}
      >
        <CiLogout className={loading?`hidden`:`flex text-xl`}/>
        {loading ? <ClipLoader color="white" size={22} /> : "Logout"}
      </button>
    </div>
  );
};

export default Modal;
