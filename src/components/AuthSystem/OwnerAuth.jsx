import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import api from '../Api/Axios';
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";



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

        setLoading(true) // loader start

        try {
            if (isLogin) {
                // LOGIN API
                const res = await axios.post(
                    "https://scatch-backend-41mw.onrender.com/api/v1/owners/signin",
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    { withCredentials: true }
                );

                toast.success(res.data.message)

                // Reset only login fields
                setFormData({
                    email: "",
                    password: ""
                });
                navigate('/ownerpanel') // redirect after login
            } else {
                // SIGNUP API
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

                // Reset full signup form
                setFormData({
                    fullname: "",
                    email: "",
                    password: ""
                });

                setIsLogin(true);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }
        setLoading(false); // loader stop
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100 p-5">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-3">
                    Scatch
                </h1>
                <p className="mb-3 text-blue-600 font-bold text-2xl flex justify-center items-center">Admin Login</p>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`px-4 py-2 ${isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                            }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`px-4 py-2 ${!isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                            }`}
                    >
                        Signup
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                        type="submit"
                    >
                        {loading ? <PulseLoader size={10} color="#fff" /> : (isLogin ? "Login" : "Create Account")}
                    </button>
                    <p className="flex justify-center items-center"><Link to='/' className="text-blue-600">Back to User Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
