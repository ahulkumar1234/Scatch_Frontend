import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
import { FaStore } from "react-icons/fa";


const OwnerPanel = () => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const handleImage = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  //submitForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("stock", formData.stock);
      form.append("image", formData.image);

      const res = await axios.post('https://scatch-backend-41mw.onrender.com/api/v1/products/create', form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success('Product Created Successfully!');
      setLoading(false);

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null
      });

    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="sidemenu bg-white h-screen p-5 border-x border-gray-300">
        <h1 className="text-xl text-blue-600 font-bold">Scatch <span className='text-black font-semibold'>Owner Panel</span></h1>

        {/* Links */}
        <div className="links mt-9">
          <Link className='text-blue-700 hover:border transition-all duration-200 ease-in-out font-semibold bg-blue-100 px-5 py-2 flex justify-center items-center gap-2' to='/ownerstore'><FaStore /><span>Store</span></Link>
        </div>
      </div>

      {/* Product Form Section */}
      <div className="bg-gray-100 w-full min-h-screen flex flex-col md:flex-row justify-center items-start">
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-4xl p-6 space-y-5 m-0 md:my-5">

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create New Product
          </h2>

          {/* Product Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Title</label>
            <input
              onChange={handleChange}
              name="title"
              value={formData.title}
              type="text"
              placeholder="Enter product title"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              onChange={handleChange}
              name="description"
              value={formData.description}
              placeholder="Enter product description"
              rows="1"
              className="w-full border border-gray-300 px-4 py-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              onChange={handleChange}
              name="price"
              value={formData.price}
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Category</option>
              <option>Fashion</option>
              <option>Premium Bag</option>
              <option>Travel bag</option>
            </select>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Product Image</label>
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              className="w-full text-gray-700 border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock Quantity</label>
            <input
              onChange={handleChange}
              name="stock"
              value={formData.stock}
              type="number"
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 text-white py-2 rounded-md text-md cursor-pointer ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition-all`}>
            {loading ? <PulseLoader size={15} loading={loading} /> : "Create Product"}
          </button>
        </form>
      </div>

    </div>
  )
}

export default OwnerPanel
