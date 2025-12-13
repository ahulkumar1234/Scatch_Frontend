import axios from 'axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ClockLoader from "react-spinners/ClockLoader"
import PuffLoader from "react-spinners/PuffLoader"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const StorePage = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(null)
    const [prodloading, setProdLoading] = useState(true)

    // SINGLE STATE FOR EDIT
    const [editProduct, setEditProduct] = useState(null)
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        price: "",
        stock: ""
    })

    // FETCH PRODUCTS
    const getproducts = async () => {
        try {
            const res = await axios.get('https://scatch-backend-41mw.onrender.com/api/v1/products/all')
            setProducts(res.data.allproducts)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setProdLoading(false)
        }
    }

    useEffect(() => {
        getproducts()
    }, [])

    // LOADING SCREEN
    if (prodloading) {
        return (
            <div className='flex justify-center items-center w-full h-screen'>
                <PuffLoader color='blue' size={100} />
            </div>
        )
    }

    // DELETE PRODUCT
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?")
        if (!confirmDelete) return

        //DELETE BUTTON LOADING
        setLoading(id)

        try {
            await axios.delete(`https://scatch-backend-41mw.onrender.com/api/v1/products/delete/${id}`);
            setProducts(products.filter((item) => item._id !== id))
            toast.success("Deleted Successfully!")
        } catch (error) {
            toast.error(error.message)
        }

        setLoading(null)
    }

    // UPDATE PRODUCT WITH SINGLE STATE editData
    const handleUpdate = async (id) => {
        try {
            await axios.put(
                `https://scatch-backend-41mw.onrender.com/api/v1/products/update/${id}`,
                editData
            )

            // UPDATE UI
            setProducts(products.map((item) =>
                item._id === id ? { ...item, ...editData } : item
            ))
            toast.success("Updated Successfully!")
            setEditProduct(null) // close modal
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="heading flex justify-center items-center m-5 font-extrabold text-5xl text-blue-900">
                <h1>Store Items</h1>
            </div>

            <div className="backbtn text-blue-600 flex justify-end items-center mx-5">
                <button
                    className='cursor-pointer hover:underline font-semibold'
                    onClick={() => navigate('/ownerpanel')}
                >
                    ← Back to Panel
                </button>
            </div>

            <div className="product p-5">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 border">Sr. No</th>
                            <th className="py-3 px-4 border">Title</th>
                            <th className="py-3 px-4 border">Description</th>
                            <th className="py-3 px-4 border">Price (₹)</th>
                            <th className="py-3 px-4 border">Stock</th>
                            <th className="py-3 px-4 border">Edit</th>
                            <th className="py-3 px-4 border">Delete</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {products.map((item, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className='py-2 px-4 border'>{index + 1}</td>
                                <td className='py-2 px-4 border font-semibold'>{item.title}</td>
                                <td className='py-2 px-4 border'>{item.description}</td>
                                <td className='py-2 px-4 border'>{item.price}</td>
                                <td className={`py-2 px-4 border font-bold ${item.stock < 15 ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                                    {item.stock}
                                </td>

                                <td className='py-2 px-4 border'>
                                    <button
                                        onClick={() => {
                                            setEditProduct(item);
                                            setEditData({
                                                title: item.title,
                                                description: item.description,
                                                price: item.price,
                                                stock: item.stock
                                            })
                                        }}
                                        className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer'
                                    >
                                        <FaEdit />
                                    </button>
                                </td>

                                <td className='py-2 px-4 border'>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer'
                                    >
                                        {loading === item._id ? <ClockLoader size={20} color="#fff" /> : <MdDelete />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* UPDATE MODAL */}
            {editProduct && (
                <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Product</h2>

                        <input
                            className="border border-blue-600 outline-none p-2 w-full mb-2"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        />

                        <input
                            className="border border-blue-600 outline-none p-2 w-full mb-2"
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        />

                        <input
                            className="border border-blue-600 outline-none p-2 w-full mb-2"
                            type="number"
                            value={editData.price}
                            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        />

                        <input
                            className="border border-blue-600 outline-none p-2 w-full mb-2"
                            type="number"
                            value={editData.stock}
                            onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                        />

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setEditProduct(null)}
                                className="px-4 py-1 bg-gray-400 text-white rounded cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleUpdate(editProduct._id)}
                                className="px-4 py-1 bg-blue-600 text-white rounded cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default StorePage
