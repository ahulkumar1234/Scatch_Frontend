import { useEffect, useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { useCart } from "../../Context/CartContext";


const Shop = () => {

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);

  const [cardadded, setcartadded] = useState(false)

  const addtoCart = () => [
    setcartadded(!cardadded)
  ]

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/products/all");
    setProducts(res.data.allproducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>

      <div className="flex gap-10 p-5 pt-24">

        {/* LEFT SIDEBAR */}
        <div className="left-menu w-48 flex flex-col gap-4 bg-white shadow-md p-4 ">
          <NavLink to="/orders" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Orders  <FaCartShopping /></NavLink>
          <NavLink to="/ratings" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Ratings<MdOutlineReviews /></NavLink>
          <NavLink to="/shop" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Material<SiMaterialdesignicons /></NavLink>
          <NavLink to="/shop" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Brand<MdOutlineBrandingWatermark /></NavLink>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="flex flex-wrap gap-5 justify-end flex-grow">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg p-4 cursor-pointer hover:scale-105 transition ease-in"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-[200px] h-[200px]"
              />

              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-600 w-[200px] text-sm">{item.description}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-green-600">₹{item.price}</span>
                <button
                  onClick={() => addToCart(item)}
                  className={`${cardadded?'bg-gray-400':'bg-blue-600'} text-white px-3 py-1 rounded cursor-pointer`}>
                  {cardadded?'Added':'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Shop