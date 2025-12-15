import { useState } from "react";

const Adress = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "COD",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
            alert("Please fill all fields");
            return;
        }

        // send data to parent / next step
        onSubmit(formData);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
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
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* Address */}
                <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* City */}
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* Pincode */}
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full border p-2 mb-4 rounded"
                />

                {/* Payment Method */}
                <div className="mb-4">
                    <label className="font-semibold block mb-1">
                        Payment Method
                    </label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="COD">Cash on Delivery</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default Adress;
