import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

const OrderPlace = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `https://scatch-backend-41mw.onrender.com/api/v1/orders/${orderId}`,
        { withCredentials: true }
      );
      setOrder(res.data);

      // stop confetti after 5 seconds
      setTimeout(() => {
      setShowConfetti(false);
      }, 4000);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="blue" size={60} />
      </div>
    );
  }
  

  return (
    <div className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-300 via-green-200 to-green-100">

      {/* 🎉 Confetti */}
      {showConfetti && (
        <Confetti
          numberOfPieces={250}
          recycle={false}
          gravity={0.15}
        />
      )}

      {/* Card */}
      <div className="
        w-full max-w-xl text-white p-6 rounded-2xl m-5
        border border-white/30 shadow-2xl bg-green-600
        animate-[fadeIn_0.6s_ease-out]
      ">

        {/* Success Icon */}
        <FaCheckCircle
          className="
            w-full text-white text-8xl sm:text-8xl my-5
            animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]
          "
        />

        {/* Title */}
        <div className="text-2xl sm:text-3xl font-bold text-center">
          Order Placed Successfully!
          <p className="text-[16px] mt-1 font-light text-gray-200">
            Thanks for your purchase
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-8 space-y-2 text-[15px]">
          <p className="animate-[slideUp_0.6s_ease-out]">
            <b>Order ID:</b> {order._id}
          </p>

          <p className="animate-[slideUp_0.7s_ease-out]">
            <b>Status:</b>
            <span className="ml-1 text-sm ">
              {order.status}
            </span>
          </p>

          <p className="animate-[slideUp_0.8s_ease-out]">
            <b>Total Amount:</b> ₹{" "}
            <span className="">
            {Math.round(order.totalPrice)}
            </span>
          </p>
        </div>

        {/* Shipping */}
        <div className="mt-6 text-[15px] animate-[slideUp_0.9s_ease-out]">
          <h3 className="font-semibold mb-1">Shipping Address</h3>
          <p>{order.shippingAddress.fullName}</p>
          <p>
            {order.shippingAddress.address}, {order.shippingAddress.city}
          </p>
          <p>{order.shippingAddress.pincode}</p>
        </div>

        {/* Explore More */}
        <div
          onClick={() => navigate("/shop")}
          className="
            mt-8 flex justify-end items-center gap-2
            text-blue-900 font-medium cursor-pointer
            transition-all duration-300
            hover:translate-x-2 hover:text-blue-700
          "
        >
          <FaArrowLeftLong />
          <span>Explore more</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPlace;
