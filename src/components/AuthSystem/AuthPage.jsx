import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuth } from "../../Context/AuthContext";

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
        navigate("/shop");
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
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="userauth min-h-screen flex justify-center items-center bg-cover bg-center px-4">
      <div className="bg-transparent backdrop-blur-sm  border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-3">
          Scatch
        </h1>
        <p className="text-center text-gray-200 mb-8 text-[17px]">
          {isLogin ? "Welcome back! Login to continue" : "Create an account to start shopping"}
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-1 text-lg font-semibold transition ${
              isLogin
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-300 hover:text-blue-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`pb-1 text-lg font-semibold transition ${
              !isLogin
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-300 hover:text-blue-600"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-600 outline-none text-gray-200"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-600 outline-none text-gray-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-600 outline-none text-gray-200"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-blue-700 text-white p-2 rounded-md font-semibold hover:bg-blue-800 transition cursor-pointer mt-2 "
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
            <Link to="/owner" className="text-blue-600 hover:underline font-medium">
              Admin Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
