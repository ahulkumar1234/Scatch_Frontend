import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const Modal = ({ handlClick }) => {
    const location = useLocation();
    if (location.pathname === "/") return null;

    const navigate = useNavigate();
    const { setIsLoggedIn, isLoggedIn } = useAuth();

    const [loading, setLoading] = useState(false)

    if (!isLoggedIn) return null;

    const handelLogout = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                "https://scatch-backend-41mw.onrender.com/api/v1/users/logout",
                {},
                { withCredentials: true }
            );
            toast.success(res.data.message);
            setIsLoggedIn(false);
            navigate("/");
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            {/* Overlay */}
            {/* <div
        onClick={handlClick}
        className="fixed z-40"
      ></div> */}

            {/* Modal Box */}
            <div className={`fixed z-50 p-5 top-20 right-10 w-[200px] justify-center hidden md:flex flex-col h-[130px] bg-white rounded-lg shadow-lg space-y-2`}>
                <RxCross1
                    className="absolute text-gray-500 top-1 right-1 cursor-pointer"
                    onClick={handlClick}
                />

                <button
                    onClick={() => {
                        navigate("/profile");
                    }}
                    className="w-full cursor-pointer active:scale-95 transition-all duration-200 ease-in-out bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
                >
                    Profile
                </button>

                <button
                    onClick={handelLogout}
                    disabled={loading}
                    className={`
                      w-full px-3 py-1 rounded text-white transition-all duration-200 ${loading
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 cursor-pointer active:scale-95"}
                      `}
                >
                    Logout
                </button>

            </div>
        </>
    );
};

export default Modal;
