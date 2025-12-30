import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import logo2 from '/images/logo-2.png'



const AuthPage = () => {


  const navigate = useNavigate();
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
          "https://scatch-backend-41mw.onrender.com/api/v1/owners/signin",
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        );
        toast.success(res.data.message);
        setFormData({ email: "", password: "" });
        navigate("/ownerpanel");
      } else {
        const res = await axios.post(
          "https://scatch-backend-41mw.onrender.com/api/v1/owners/register",
          {
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        toast.success(res.data.message);
        setFormData({ fullname: "", email: "", password: "" });
        navigate("/ownerpanel");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="ownerauth min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 via-blue-100 px-4">
      <div className="bg-white backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center font-extrabold text-blue-600 text-start">
          <img className="w-[200px]" src={logo2} alt="logo" />
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-6 m-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-1 text-lg font-medium transition ${isLogin
              ? "text-blue-700 border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-1 text-lg font-medium transition ${!isLogin
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
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-2 focus:border-blue-600 outline-none text-gray-700"
                  placeholder="Enter full name"
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
                placeholder="Enter email"
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
            className={`w-full ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"} p-2 rounded-md font-semibold transition mt-2`}
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

          <p className="flex justify-center mt-2 text-sm">
            <Link to="/" className="text-blue-500 hover:underline font-medium">
              Back to User Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
