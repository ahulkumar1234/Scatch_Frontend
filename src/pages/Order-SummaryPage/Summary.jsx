import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import loadRazorpay from "../../utils/loadRazorpay";

const Summary = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  if (!state?.shippingAddress) {
    navigate("/cart");
    return null;
  }

  const { shippingAddress, paymentMethod } = state;

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/cart/cartItems",
        { withCredentials: true }
      );
      setCartItems(res.data.Cartitems.items);
    } catch (error) {
      toast.error("Failed to load cart");
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-xl">
        <ClipLoader color="blue" size={60} />
      </div>
    );
  }



  // 🧮 PRICE CALCULATION (UI only)
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const taxPrice = itemsPrice * 0.18;
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrderHandler = async () => {
    if (orderLoading) return;

    // 👉 CASE 1: CASH ON DELIVERY
    if (paymentMethod === "COD") {
      try {
        setOrderLoading(true);

        const res = await axios.post(
          "https://scatch-backend-41mw.onrender.com/api/v1/orders/create",
          {
            orderItems: cartItems.map(item => ({
              productId: item.productId._id,
              quantity: item.quantity,
            })),
            shippingAddress,
            paymentMethod: "COD",
          },
          { withCredentials: true }
        );

        navigate(`/checkout/orders/${res.data.orderData._id}`);
      } catch (error) {
        toast.error(error.response?.data?.message || "Order failed");
      } finally {
        setOrderLoading(false);
      }

      return;
    }

    // 👉 CASE 2: ONLINE PAYMENT (RAZORPAY)
    try {
      setOrderLoading(true);

      const razorLoaded = await loadRazorpay();
      if (!razorLoaded) {
        toast.error("Razorpay SDK failed to load");
        setOrderLoading(false);
        return;
      }

      const { data } = await axios.post(
        "https://scatch-backend-41mw.onrender.com/api/v1/payment/create",
        { amount: totalPrice },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ ENV KEY
        amount: data.order.amount,
        currency: "INR",
        name: "Scatch Store",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const res = await axios.post(
              "https://scatch-backend-41mw.onrender.com/api/v1/orders/create",
              {
                orderItems: cartItems.map(item => ({
                  productId: item.productId._id,
                  quantity: item.quantity,
                })),
                shippingAddress,
                paymentMethod: "ONLINE",
                paymentResult: response,
              },
              { withCredentials: true }
            );

            toast.success("Payment successful");
            navigate(`/checkout/orders/${res.data.orderData._id}`);
          } catch (err) {
            toast.error("Order creation failed");
          } finally {
            setOrderLoading(false); // ✅ YAHAN AANA CHAHIYE
          }
        },

        modal: {
          ondismiss: function () {
            setOrderLoading(false); // ✅ popup close
          }
        },

        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      toast.error("Payment failed");
      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
      setOrderLoading(false);
    }

  };




  return (
    <>
      <div className="max-w-5xl mx-auto p-5 grid grid-cols-1 justify-center items-center h-screen md:mt-0 md:grid-cols-3 md:gap-5">

        <div className="Back-Button flex justify-center items-center absolute bottom-5 right-50 text-blue-600 hover:underline">
          <button className="cursor-pointer" onClick={() => onClick = navigate(-1)}>Go Back</button>
        </div>

        {/* LEFT */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between border-b py-2">
              <span>{item.productId.title} × {item.quantity}</span>
              <span>₹ {item.productId.price * item.quantity}</span>
            </div>
          ))}

          <h3 className="mt-4 font-semibold">Shipping Address</h3>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.address}, {shippingAddress.city}</p>
          <p>{shippingAddress.pincode}</p>

          <p className="mt-2">Payment: <b>{paymentMethod}</b></p>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Price Details</h2>

          <div className="flex justify-between">
            <span>Items</span>
            <span>₹ {itemsPrice}</span>
          </div>

          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹ {taxPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹ {shippingPrice}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={placeOrderHandler}
            disabled={orderLoading}
            className="w-full flex justify-center items-center bg-blue-600 text-white mt-4 py-2 rounded
             cursor-pointer  disabled:cursor-not-allowed
             active:scale-95 transition-all duration-300"
          >
            {orderLoading ? <ClipLoader color="white" size={20} className="mx-2" /> : ""}
            {orderLoading ? "Placing Order..." : "Place Order"}
          </button>

        </div>
      </div>
    </>
  );
}

export default Summary