import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import toast from "react-hot-toast";

const DetailProd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1); // ⬅ quantity state

  const addToCart = async () => {
    try {
      const res = await axios.post(
        "https://scatch-backend-41mw.onrender.com/api/v1/cart/add",
        { productId: product._id, quantity: qty }, // ⬅ quantity sent to the backend
        { withCredentials: true }
      );

      toast.success(`Added ${qty} item(s) to Cart 🛒`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Please login first!");
    }
  };

  const fetchDetailsProducts = async () => {
    const res = await axios.get(
      `https://scatch-backend-41mw.onrender.com/api/v1/products/details/${id}`
    );
    setProduct(res.data.data);
  };

  useEffect(() => {
    fetchDetailsProducts();
  }, [id]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="blue" />
      </div>
    );

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 md:py-10">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6 pb-12">
          {/* Back to Shop */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/shop")}
              className="text-blue-600 hover:underline active:scale-95 transition cursor-pointer"
            >
              ← Back to Shop
            </button>
          </div>

          {/* Product Section */}
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Product Image */}
            <div className="flex-1 flex justify-center">
              <img
                className="w-[420px] h-[520px] object-cover rounded-md shadow-md"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h1 className="font-bold text-3xl mb-2">{product.title}</h1>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <h2 className="text-2xl font-bold text-green-600 mt-4">
                ₹ {product.price}
              </h2>

              {/* Ratings */}
              <div className="flex gap-1 mt-2 text-yellow-500">
                ★ ★ ★ ★ ☆
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mt-5">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="w-9 h-9 flex justify-center items-center border border-gray-500 rounded text-xl active:scale-90"
                >
                  -
                </button>

                <span className="font-bold text-xl">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 flex justify-center items-center border border-gray-500 rounded text-xl active:scale-90"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 active:scale-95 transition-all cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProd;
