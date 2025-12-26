import React from "react";
import { NavLink } from "react-router-dom";

const Cards = () => {
    const bagProducts = [
        {
            id: 1,
            name: "Travel Backpack",
            price: 2499,
            oldPrice: 2999,
            category: "Backpack",
            image: "https://tripole.in/cdn/shop/files/Tripole_Walker_65L_Grey_Sea_Green_Front.jpg?v=1748090177&width=1500",
            rating: 4.5,
            sale: true,
        },
        {
            id: 2,
            name: "Office Laptop Bag",
            price: 1999,
            oldPrice: 2499,
            category: "Laptop Bag",
            image: "https://cpimg.tistatic.com/05991423/b/4/leather-laptop-office-bags.jpg",
            rating: 4.3,
            sale: true,
        },
        {
            id: 3,
            name: "Casual Sling Bag",
            price: 1299,
            oldPrice: 1599,
            category: "Sling Bag",
            image: "https://5.imimg.com/data5/ANDROID/Default/2022/3/SN/AM/HZ/33168035/product-jpeg-500x500.jpg",
            rating: 4.2,
            sale: false,
        },
        {
            id: 4,
            name: "Gym & Duffle Bag",
            price: 1799,
            oldPrice: 2199,
            category: "Duffle Bag",
            image: "https://contents.mediadecathlon.com/p2038081/2375f49e688f12688078c456f5973b29/p2038081.jpg",
            rating: 4.6,
            sale: true,
        },
        {
            id: 5,
            name: "Premium Hand Bag",
            price: 2999,
            oldPrice: 3499,
            category: "Hand Bag",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
            rating: 4.7,
            sale: false,
        },
    ];

    return (
        <div className="w-full px-10 py-10 bg-white">
            {/* Cards Wrapper */}
            <div className="flex flex-wrap justify-center gap-8">
                {bagProducts.map((item) => (
                    <NavLink to={'/shop'}>
                        <div
                            key={item.id}
                            className="relative bg-white text-black rounded-xl shadow-lg w-[260px] overflow-hidden hover:scale-105 transition duration-300"
                        >
                            {/* SALE Badge */}
                            {item.sale && (
                                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                                    SALE
                                </span>
                            )}

                            {/* Image */}
                            <div className="bg-gray-100 h-[220px] flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-[180px] object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="font-semibold text-lg">{item.name}</h2>

                                <div className="flex items-center gap-2">
                                    <p className="text-blue-600 font-bold text-xl">
                                        ₹{item.price}
                                    </p>
                                    <p className="line-through text-gray-400 text-sm">
                                        ₹{item.oldPrice}
                                    </p>
                                </div>

                                <p className="text-yellow-500 text-sm">
                                    ⭐ {item.rating}
                                </p>

                                <button className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                                    See details
                                </button>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Cards;
