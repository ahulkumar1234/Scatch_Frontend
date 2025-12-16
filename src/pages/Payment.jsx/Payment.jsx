import React from 'react'

const Payment = () => {
  return (
    <div>Payment</div>
  )
}

export default Payment






  // cart items ko orderItems me convert
  // const handleCheckout = async () => {
  //   try {
  //     const orderItems = cartItems.items
  //       .filter(item => item.productId) // 🔥 IMPORTANT FIX
  //       .map(item => ({
  //         productId: item.productId._id,
  //         quantity: item.quantity,
  //       }));

  //     if (orderItems.length === 0) {
  //       toast.error("No valid products in cart");
  //       return;
  //     }

      // Temporary address (next step me form banayenge)
  //     const shippingAddress = {
  //       fullName: "Rahul Kumar",
  //       phone: "9876543210",
  //       address: "Main Road",
  //       city: "Ranchi",
  //       pincode: "834001",
  //     };

  //     const paymentMethod = "COD";

  //     const res = await axios.post(
  //       "https://scatch-backend-41mw.onrender.com/api/v1/orders/create",
  //       {
  //         orderItems,
  //         shippingAddress,
  //         paymentMethod,
  //       },
  //       { withCredentials: true }
  //     );

  //     toast.success("Order placed successfully!");
  //     setCartItems({ items: [] });
  //     console.log(res)
  //     //navigate("/order-success");

  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Order failed");
  //   }
  // }
