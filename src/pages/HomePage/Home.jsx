import bgimg from '/images/woman-with-bag.jpg'
import { useNavigate } from 'react-router-dom'
import '../HomePage/Home.css'
import { useEffect, useState } from "react";
import Cards from './Cards';
import { FaCircleArrowUp } from "react-icons/fa6";


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
        <div className="flex  min-h-screen items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            <div className="">
              <h1 className='relative text-gray-200 text-6xl mb-10 font-semibold tracking-tighter flex-wrap'><span className='text-5xl sm:text-6xl md:text-8xl mt-10'>Stylish</span>& Durable Bags for <span className='absolute -z-10 text-5xl sm:text-7xl md:text-8xl mx-4 text-blue-800/70 font-bold right-3.5 mt-12 sm:mt-10 md:mt-6 tracking-widest'>Everyday</span> Life</h1>
            </div>
            <p className="text-white font-light mt-20 text-sm tracking-tight sm:text-lg line-clamp-3 md:line-clamp-none">
              Scatch brings you stylish and durable bags made for everyday life. Designed with care, built for comfort, and crafted to match your modern lifestyle.
            </p>
            <div className='mt-3'>
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

          <div className="bg-blue-500 text-white px-3 flex justify-center items-center gap-1 py-2 rounded-md text-center min-w-[50px]">
            <h2 className="text-xl font-bold">{String(hours).padStart(2, "0")}</h2>
            <span className="text-xs">Hrs</span>
          </div>

          <span className="text-xl font-bold">:</span>

          <div className="bg-blue-500 text-white px-3 flex justify-center items-center gap-1 py-2 rounded-md text-center min-w-[50px]">
            <h2 className="text-xl font-bold">{String(minutes).padStart(2, "0")}</h2>
            <span className="text-xs">Min</span>
          </div>

          <span className="text-xl font-bold">:</span>

          <div className="bg-blue-500 text-white flex justify-center items-center gap-1 px-3 py-2 rounded-md text-center min-w-[50px]">
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