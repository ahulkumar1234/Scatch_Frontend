import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import ClipLoader from "react-spinners/ClipLoader";

const OrderPlace = () => {
  const { orderId } = useParams(); // URL se orderId
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();

  const fetchOrder = async () => {
    const res = await axios.get(
      `https://scatch-backend-41mw.onrender.com/api/v1/orders/${orderId}`,
      { withCredentials: true }
    );
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-xl">
        <ClipLoader color="blue" />
      </div>
    );
  }


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow m-5 border border-green-300">
        <div className="text-2xl font-bold mb-4 text-center">
          Order Placed <SiTicktick className="flex justify-center items-center w-full text-green-500 text-4xl " />
        </div>

        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Total:</b> ₹ {order.totalPrice}</p>

        <h3 className="font-semibold mt-4">Shipping Address</h3>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
        <p>{order.shippingAddress.pincode}</p>

        <div
          onClick={() => navigate('/shop')}
          className="flex justify-end items-center text-blue-600 hover:underline cursor-pointer gap-2"
        >
          <FaArrowLeftLong />
          <span>Explore more</span>
        </div>
      </div>
    </div>

  );
};

export default OrderPlace;
