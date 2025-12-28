import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuth } from "../../Context/AuthContext";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import logo2 from '/images/logo-2.png'

const AuthPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(
          "https://scatch-backend-41mw.onrender.com/api/v1/users/login",
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        );

        toast.success(res.data.message);
        setFormData({ email: "", password: "" });

        setIsLoggedIn(true);
        navigate("/home");
      } else {
        const res = await axios.post(
          "https://scatch-backend-41mw.onrender.com/api/v1/users/register",
          {
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );

        toast.success(res.data.message);
        setFormData({ fullname: "", email: "", password: "" });
        setIsLogin(true);
        navigate("/shop");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="userauth min-h-screen flex justify-center items-center bg-cover bg-gradient-to-r from-blue-200 via-blue-100  px-4">
      <div className="bg-white backdrop-blur-sm  border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img className="w-[200px]" src={logo2} alt="logo" />
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-8 m-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-1 text-lg font-semibold transition ${isLogin
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`pb-1 text-lg font-semibold transition ${!isLogin
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Full Name
              </label>

              {/* Wrapper must be relative */}
              <div className="relative">
                {/* Icon */}
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

                {/* Input */}
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-2 focus:border-blue-600 outline-none text-gray-700"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>

          )}

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-2 focus:border-blue-600 outline-none text-gray-700"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-md" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-2 focus:border-blue-500 outline-none text-gray-700"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          {/* Submit */}
          <button
            disabled={loading}
            className={`${loading ? "cursor-not-allowed bg-gray-500" : "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"} w-full p-2 rounded-md font-semibold transition mt-2`}
            type="submit"
          >
            {loading ? (
              <PulseLoader size={10} color="#fff" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm mt-2">
            <Link to="/owner" className="text-blue-500 hover:underline font-medium">
              Admin Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
