import { useEffect, useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import ScaleLoader from "react-spinners/ScaleLoader";


const Shop = () => {


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuopen, setmenuOpen] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    const res = await axios.get("https://scatch-backend-41mw.onrender.com/api/v1/products/all");
    setProducts(res.data.allproducts);
    setLoading(false)
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-xl">
        <ScaleLoader color="blue" />
      </div>
    );
  }

  return (
    <>
      <div className="flex p-5">
        {/* LEFT SIDEBAR */}
        {/* <div className="left-menu w-48 flex flex-col gap-4 bg-white shadow-md p-5">
          <NavLink to="/orders" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Orders  <FaCartShopping /></NavLink>
          <NavLink to="/ratings" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Ratings<MdOutlineReviews /></NavLink>
          <NavLink to="/shop" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Material<SiMaterialdesignicons /></NavLink>
          <NavLink to="/shop" className='hover:underline transition-all ease-in-out flex justify-center items-center gap-2 bg-blue-100 p-2'>Brand<MdOutlineBrandingWatermark /></NavLink>
        </div> */}

        {/* PRODUCTS SECTION */}
        <div className="flex flex-wrap gap-5 justify-center">
          {products.map((item) => (
            <NavLink to={`/details/${item._id}`} key={item._id}>
              <div className="bg-white w-[300px] shadow-lg p-4 cursor-pointer hover:scale-105 transition ease-in">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-[500px] h-[300px]"
                />

                <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                <p className="text-gray-600 w-[200px] line-clamp-2 text-sm">{item.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-green-600">₹{item.price}</span>
                  <button className="bg-blue-600 transition-all text-white px-3 py-1 rounded cursor-pointer">
                    See Details
                  </button>
                </div>
              </div>
            </NavLink>

          ))}
        </div>
      </div>

    </>
  )
}

export default Shop