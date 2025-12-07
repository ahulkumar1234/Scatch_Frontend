import React from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {

  // Temporary dummy items — later backend se fill hoga
  const cartItems = [
    {
      id: 1,
      title: "Nike Sneakers",
      price: 2999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1528701800489-20be9c5656a0"
    },
    {
      id: 2,
      title: "Samsung Headphones",
      price: 1599,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1580894894514-d71703a3aa65"
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  return (
    <div className="bg-gray-200 w-full min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">

        {/* LEFT — Cart Items */}
        <div className="flex-1 bg-white shadow-md p-5 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4 gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">₹ {item.price}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <button className="px-2 py-1 bg-gray-300 rounded">−</button>
                <span>{item.quantity}</span>
                <button className="px-2 py-1 bg-gray-300 rounded">+</button>
              </div>

              {/* Remove item */}
              <button className="text-red-600 text-xl ml-3 hover:scale-110 transition">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT — Order Summary */}
        <div className="w-full lg:w-80 bg-white shadow-md p-5 rounded-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>
            <span>₹ 70</span>
          </div>

          <hr />

          <div className="flex justify-between mt-4 text-lg font-semibold">
            <span>Total</span>
            <span>₹ {subtotal + 70}</span>
          </div>

          <button className="w-full bg-blue-600 text-white mt-6 py-2 rounded hover:bg-blue-700 transition-all active:scale-95">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
