import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/cart/cartItems",
        { withCredentials: true } // token cookie send automatically
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <h2 className="flex justify-center items-center h-screen text-xl">
        Your cart is empty 🛒
      </h2>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md p-6 rounded-md">

        <h1 className="text-2xl font-bold mb-6">Your Cart ({cartItems.length})</h1>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-6 border-b py-4"
          >
            <img
              src={item.productId.image}
              alt={item.productId.title}
              className="w-28 h-28 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {item.productId.title}
              </h2>
              <p className="text-gray-600">{item.productId.description}</p>
              <p className="font-bold mt-1 text-green-700">
                ₹ {item.productId.price}
              </p>
            </div>

            <p className="px-4 py-1 bg-gray-300 rounded">
              Qty: {item.quantity}
            </p>
          </div>
        ))}

        {/* Total */}
        <div className="mt-6 flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span>₹ {totalPrice}</span>
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 active:scale-95 transition-all">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
