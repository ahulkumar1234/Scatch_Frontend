import { useEffect, useState } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  
  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/cart/cartItems",
        { withCredentials: true }
      );
      setCartItems(res.data.Cartitems || []);
    } catch (error) {
      toast.error(error)
      console.log(error)
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <h2 className="flex justify-center items-center h-screen text-xl">
        <ScaleLoader color="blue" />
      </h2>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <h2 className="flex justify-center items-center h-screen text-xl">
        Cart is Empty 🛒
      </h2>
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      item.productId ? acc + item.productId.price * item.quantity : acc,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md p-6 rounded-md">

        <h1 className="text-2xl font-bold mb-6">
          Your Cart ({cartItems.length})
        </h1>

        {cartItems.map((item) => {
          if (!item.productId) return null; // skip null products

          return (
            <div key={item._id} className="flex items-center gap-6 border-b py-4">
              <img
                src={item.productId.image}
                className="w-28 h-28 object-cover rounded"
                alt=""
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {item.productId.title}
                </h2>
                <p className="text-gray-600">{item.productId.description}</p>
                <p className="font-bold text-green-700 mt-1">
                  ₹ {item.productId.price}
                </p>
              </div>

              <p className="px-4 py-1 bg-gray-300 rounded">
                Qty: {item.quantity}
              </p>
            </div>
          );
        })}

        <div className="mt-6 flex justify-between items-center text-xl font-bold">
          <span>Total Amount:</span>
          <span>₹ {totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
