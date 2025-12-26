import bgimg from '/images/woman-with-bag.jpg'
import logo from '/images/logo-2.png'
import { useNavigate } from 'react-router-dom'
import '../HomePage/Home.css'
import { useEffect, useState } from "react";
import Cards from './Cards';


const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(5 * 60 * 60); // 5 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;


  return (
    <>

      <div className="relative h-screen w-full overflow-y-auto bg-blue-900/30">

        {/* Background Image (Fixed) */}
        <div
          className="fixed top-0 left-0 h-screen w-full bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Content */}
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            <div className="text-center max-w-2xl">
              <img
                src={logo}
                alt="Scatch Logo"
                className="mx-auto w-64"
              />
            </div>
            <p className="text-white font-light text-lg line-clamp-3 md:line-clamp-none">
              Scatch is a modern bag brand designed for people who value style, quality, and comfort. We offer a wide range of premium bags that are perfect for daily use, travel, work, and special occasions. Every Scatch bag is crafted with durable materials and a stylish design to match your lifestyle. Our goal is to provide fashionable and reliable bags that make your everyday journey easier and more confident.
            </p>
            <div className=''>
              <button
                onClick={() => navigate('/shop')}
                className='mt-5 mx-2 px-6 py-2 text-white rounded cursor-pointer bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 active:scale-95 transition-all ease-in-out duration-200 animate-bounce drop-shadow-[0_0_20px_rgba(0,180,255,0.9)]'>Buy Now</button>
              <button className='border mt-5 mx-2 px-6 py-1.5 text-white rounded cursor-pointer '>Enqiry</button>
            </div>
          </div>
        </div>
      </div>

      {/* flash sale section */}
      <div className='flash-sale bg-white p-5'>
        <p className='mx-4'>Today's</p>
        <h1 className='text-4xl mt-7 mx-7 font-semibold mb-4 md:mb-0'>Flash Sales</h1>
        {/* Timer */}
        <div className="flex gap-2 items-center justify-center text-black">

          <div className="bg-blue-600 text-white px-3 flex justify-center items-center gap-1 py-2 rounded-md text-center min-w-[50px]">
            <h2 className="text-xl font-bold">{String(hours).padStart(2, "0")}</h2>
            <span className="text-xs">Hrs</span>
          </div>

          <span className="text-xl font-bold">:</span>

          <div className="bg-blue-600 text-white px-3 flex justify-center items-center gap-1 py-2 rounded-md text-center min-w-[50px]">
            <h2 className="text-xl font-bold">{String(minutes).padStart(2, "0")}</h2>
            <span className="text-xs">Min</span>
          </div>

          <span className="text-xl font-bold">:</span>

          <div className="bg-blue-600 text-white flex justify-center items-center gap-1 px-3 py-2 rounded-md text-center min-w-[50px]">
            <h2 className="text-xl font-bold">{String(seconds).padStart(2, "0")}</h2>
            <span className="text-xs">Sec</span>
          </div>

        </div>

      </div>
      {/* cards */}
      <div className='cards bg-blue-900/50'>
        <Cards />
      </div>
    </>
  )
}

export default Home