import { FaTruck } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { BsQrCode } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useLocation } from "react-router-dom";

const Footer = () => {

    const location = useLocation();

  if (location.pathname === "/owner" || location.pathname === "/ownerpanel" || location.pathname === "/") {
    return null; // footer hide
  }

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      {/* TOP FEATURES */}
      <div className="bg-white text-black py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

          <div className="border border-gray-300 p-6 text-center">
            <FaTruck className="flex justify-center items-center w-full text-2xl mb-3" />
            <h4 className="font-semibold text-xl">FREE AND FAST DELIVERY</h4>
            <p className="text-sm text-gray-800">
              Free delivery on all orders over $140
            </p>
          </div>

          <div className="border border-gray-300 p-6 text-center">
            <FaHeadphones className="flex justify-center items-center w-full text-3xl mb-3" />
            <h4 className="font-semibold text-xl">24/7 CUSTOMER SERVICE</h4>
            <p className="text-sm text-gray-600">
              Friendly 24/7 customer support
            </p>
          </div>

          <div className="border border-gray-300 p-6 text-center">
            <RiRefund2Line className="flex justify-center items-center w-full text-4xl mb-3" />
            <h4 className="font-semibold text-xl">MONEY BACK GUARANTEE</h4>
            <p className="text-sm text-gray-600">
              We return money within 30 days
            </p>
          </div>

        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-6 py-14">

        {/* Exclusive */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Scatch</h3>
          <p className="mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>

          <div className="flex border border-gray-500 rounded">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-black px-3 py-2 outline-none w-full text-sm"
            />
            <button className="px-3 text-2xl">
              <IoIosSend />
            </button>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Support</h3>
          <p className="text-sm mb-2">
            111 Dimna Road, Mango Jamshedpur, Jharkhand
          </p>
          <p className="text-sm mb-2">exclusive@support.com</p>
          <p className="text-sm">1800-180-2223</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wish List</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Download App</h3>
          <BsQrCode className="text-9xl text-white"/>
          <div className="flex gap-4 text-xl cursor-pointer mt-5 text-white">
            <FaFacebook />
            <FaTwitter />
            <FaInstagramSquare />
            <FaLinkedin />
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © Copyright Scatch 2025. All rights reserved.
      </div>

    </footer>

  )
}

export default Footer