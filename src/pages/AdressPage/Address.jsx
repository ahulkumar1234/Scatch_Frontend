import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Address = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "COD",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // basic validation
        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.pincode
        ) {
            toast.error("Please fill all fields");
            return;
        }

        // send data to state / next step
        navigate("/checkout/summary", {
            state: {
                shippingAddress: formData,
                paymentMethod: formData.paymentMethod
            },
        });
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
                <div className="Back-Button flex justify-center items-center absolute bottom-10 text-blue-600 hover:underline">
                    <button className="cursor-pointer" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-md shadow-md w-fu border-gray-300ll max-w-md "
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Checkout
                    </h2>

                    {/* Full Name */}
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 mb-3 rounded"
                    />

                    {/* Phone */}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 mb-3 rounded"
                    />

                    {/* Address */}
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 mb-3 rounded"
                    />

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 mb-3 rounded"
                    />

                    {/* Pincode */}
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />

                    {/* Payment Method */}
                    <div className="mb-4">
                        <label className="font-semibold block mb-2">
                            Payment Method
                        </label>

                        <div className="flex gap-4">
                            {/* COD */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={formData.paymentMethod === "COD"}
                                    onChange={handleChange}
                                />
                                Cash on Delivery
                            </label>

                            {/* ONLINE */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="ONLINE"
                                    checked={formData.paymentMethod === "ONLINE"}
                                    onChange={handleChange}
                                />
                                Online Payment
                            </label>
                        </div>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer active:scale-95 transition-all duration-300 ease-in-out"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </>
    );
};

export default Address;
