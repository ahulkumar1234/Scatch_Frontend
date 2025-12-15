import { useEffect, useState } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import ClockLoader from "react-spinners/ClockLoader"
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";


const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // cart items ko orderItems me convert
  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.items
      .filter(item => item.productId) // 🔥 IMPORTANT FIX
      .map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

    if (orderItems.length === 0) {
      toast.error("No valid products in cart");
      return;
    }

      // Temporary address (next step me form banayenge)
      const shippingAddress = {
        fullName: "Rahul Kumar",
        phone: "9876543210",
        address: "Main Road",
        city: "Ranchi",
        pincode: "834001",
      };

      const paymentMethod = "COD";

      const res = await axios.post(
        "https://scatch-backend-41mw.onrender.com/api/v1/orders/create",
        {
          orderItems,
          shippingAddress,
          paymentMethod,
        },
        { withCredentials: true }
      );

      toast.success("Order placed successfully!");
      console.log(res.data);

      // OPTIONAL: cart clear / redirect
      // navigate("/order-success");

    } catch (error) {
       console.log("ORDER ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Order failed");
    }
  }

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/cart/cartItems",
        { withCredentials: true }
      );
      setCartItems(res.data.Cartitems);
    } catch (error) {
      toast.error(error)
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {

    try {
      setDeleteLoading(productId)
      // const userId = cartItems?.userId;
      const res = await axios.delete(`https://scatch-backend-41mw.onrender.com/api/v1/cart/delete/${productId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message)
      fetchCartItems();
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeleteLoading(null)
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-xl">
        <ScaleLoader color="blue" />
      </div>
    );
  }

  if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-100">
        <span className="text-7xl">🛒</span>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you removed all items</p>
      </div>
    );
  }



  const totalPrice = cartItems.items.reduce(
    (acc, item) =>
      item.productId ? acc + item.productId.price * item.quantity : acc,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-6xl mx-auto bg-white shadow-md p-6 rounded-md">

        <h1 className="text-2xl font-bold mb-6">
          Your Cart ({cartItems.items.length})
        </h1>

        {cartItems?.items?.map((item) => {
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
              <div className="flex justify-center items-center gap-2 bg-red-100 rounded">
                <p className="px-4 py-1 bg-gray-300 rounded">
                  Qty: {item.quantity}
                </p>
                <button
                  disabled={loading === item.productId._id}
                  onClick={() => handleDelete(item.productId._id)}
                  className="text-3xl flex justify-center items-center text-red-600 cursor-pointer active:scale-90 transition-all duration-300 ease-in-out disabled:opacity-50">

                  {deleteLoading === item.productId._id
                    ? <ClockLoader size={24} color="red" />
                    : <MdDelete />}
                </button>

              </div>

            </div>
          );
        })}


        <div className={`flex justify-center items-center m-5 bg-blue-600 hover:bg-blue-700 py-2 ${!cartItems || !cartItems.items || cartItems.items.length === 0 ? "hidden" : "block"}
             text-white font-semibold rounded active:scale-95 
             cursor-pointer transition-all duration-300 ease-in-out`}>
          <button
            onClick={handleCheckout}
            className="cursor-pointer"
          >
            Checkout
          </button>

        </div>

        <div className="mt-6 flex justify-between items-center text-xl font-bold">
          <span>Total Amount:</span>
          <span>₹ {totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
