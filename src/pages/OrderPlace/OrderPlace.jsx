import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderPlace = () => {
  const { orderId } = useParams(); // URL se orderId
  const [order, setOrder] = useState(null);

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

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-white p-5 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order Placed ✅</h2>

      <p><b>Order ID:</b> {order._id}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Total:</b> ₹ {order.totalPrice}</p>

      <h3 className="font-semibold mt-4">Shipping Address</h3>
      <p>{order.shippingAddress.fullName}</p>
      <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
      <p>{order.shippingAddress.pincode}</p>
    </div>
  );
};

export default OrderPlace;
