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

    const [editProduct, setEditProduct] = useState(null)
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        price: "",
        stock: ""
    })

    const getproducts = async () => {
        try {
            const res = await axios.get(
                'https://scatch-backend-41mw.onrender.com/api/v1/products/all'
            )
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

    if (prodloading) {
        return (
            <div className='flex justify-center items-center w-full h-screen'>
                <PuffLoader color='blue' size={100} />
            </div>
        )
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return
        setLoading(id)

        try {
            await axios.delete(
                `https://scatch-backend-41mw.onrender.com/api/v1/products/delete/${id}`
            )
            setProducts(products.filter(p => p._id !== id))
            toast.success("Deleted Successfully!")
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(null)
    }

    const handleUpdate = async (id) => {
        try {
            await axios.put(
                `https://scatch-backend-41mw.onrender.com/api/v1/products/update/${id}`,
                editData
            )

            setProducts(products.map(item =>
                item._id === id ? { ...item, ...editData } : item
            ))

            toast.success("Updated Successfully!")
            setEditProduct(null)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="text-center m-5 font-extrabold text-4xl md:text-5xl text-blue-900">
                Store Items
            </div>

            <div className="text-blue-600 flex justify-end mx-5">
                <button
                    className='hover:underline font-semibold cursor-pointer'
                    onClick={() => navigate('/ownerpanel')}
                >
                    ← Back to Panel
                </button>
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block p-5">
                <table className="min-w-full border bg-white shadow rounded">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 border">#</th>
                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Description</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Stock</th>
                            <th className="p-3 border">Edit</th>
                            <th className="p-3 border">Delete</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {products.map((item, i) => (
                            <tr key={item._id} className="hover:bg-gray-100">
                                <td className="border p-2">{i + 1}</td>
                                <td className="border p-2 font-semibold">{item.title}</td>
                                <td className="border p-2">{item.description}</td>
                                <td className="border p-2">₹{item.price}</td>
                                <td className={`border p-2 text-white font-bold ${item.stock < 15 ? "bg-red-500" : "bg-green-500"}`}>
                                    {item.stock}
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => {
                                            setEditProduct(item)
                                            setEditData(item)
                                        }}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        {loading === item._id
                                            ? <ClockLoader size={18} color="#fff" />
                                            : <MdDelete />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden p-4 space-y-4">
                {products.map((item) => (
                    <div key={item._id} className="bg-white shadow rounded p-4">
                        <h2 className="font-bold text-lg">{item.title}</h2>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="mt-1">₹ {item.price}</p>

                        <p className={`mt-1 inline-block px-3 py-1 rounded text-white text-sm
                            ${item.stock < 15 ? "bg-red-500" : "bg-green-500"}`}>
                            Stock: {item.stock}
                        </p>

                        <div className="flex justify-between mt-3">
                            <button
                                onClick={() => {
                                    setEditProduct(item)
                                    setEditData(item)
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                            >
                                <FaEdit />
                            </button>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                            >
                                {loading === item._id
                                    ? <ClockLoader size={18} color="#fff" />
                                    : <MdDelete />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= EDIT MODAL ================= */}
            {editProduct && (
                <div className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-80">
                        <h2 className="font-bold text-lg mb-3 text-blue-600">Edit Product</h2>

                        {["title", "description", "price", "stock"].map(field => (
                            <input
                                key={field}
                                className="border border-gray-300 rounded p-2 w-full mb-2"
                                value={editData[field]}
                                onChange={(e) =>
                                    setEditData({ ...editData, [field]: e.target.value })
                                }
                            />
                        ))}

                        <div className="flex justify-between mt-3">
                            <button
                                onClick={() => setEditProduct(null)}
                                className="bg-gray-400 text-white px-4 py-1 rounded cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleUpdate(editProduct._id)}
                                className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer"
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
