import { useCart } from "../../Context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-5 pt-24">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item) => (
        <div key={item._id} className="flex justify-between bg-white p-4 shadow rounded mb-3">

          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>₹{item.price}</p>
          </div>

          <button 
            onClick={() => removeFromCart(item._id)} 
            className="text-red-600 cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;