import { useEffect, useState } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";


const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchCartItems = async () => {
    try {
      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/cart/cartItems",
        { withCredentials: true }
      );
      setCartItems(res.data.Cartitems);
      console.log(res)
    } catch (error) {
      toast.error(error)
      console.log(error)
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {

    try {
      // const userId = cartItems?.userId;
      const res = await axios.delete(`https://scatch-backend-41mw.onrender.com/api/v1/cart/delete/${productId}`,
        { withCredentials: true }
      );

      console.log(res.data)
      fetchCartItems();

    } catch (error) {
      toast.error(error.message)
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

  if (!cartItems || cartItems.items?.length === 0) {
    return (
      <h2 className="flex justify-center items-center h-screen text-xl">
        Cart is Empty 🛒
      </h2>
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
          Your Cart ({cartItems.length})
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
                  onClick={() => handleDelete(item.productId._id)}
                  className="text-3xl text-red-600 cursor-pointer active:scale-90 transition-all duration-300 ease-in-out">
                  <MdDelete />
                </button>
              </div>

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
