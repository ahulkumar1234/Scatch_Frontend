import React from 'react'

const About = () => {
  return (
    <>
      <div className='mt-20 bg-blue-50 p-5'>
        <h1 className='flex justify-center items-center text-blue-700 text-center text-6xl mt-10 font-semibold tracking-tighter flex-wrap'><span className='text-8xl mt-10'>Stylish</span>& Durable Bags for <span className='text-7xl mx-4 text-black mb-10'>Everyday</span> Life</h1>
        <h1 className='text-blue-400 my-10 text-xl text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, quaerat! Quam, error vitae eos quisquam atque perspiciatis aliquid ipsum maiores dolorem ullam voluptate commodi delectus fuga placeat! Cupiditate tempore assumenda mollitia saepe! Impedit esse aspernatur suscipit nemo illo, excepturi maxime quasi tempore aliquid deleniti quam officiis sunt necessitatibus eius aliquam?</h1>

        <div className='flex flex-wrap gap-5 justify-center items-center'>
          <div className='box w-80 relative border border-gray-400 rounded-2xl h-80 flex hover:shadow-xl transition-all ease-in-out duration-300 cursor-pointer flex-col justify-start items-center'>
            <div className='w-30 h-30 border border-gray-400 flex justify-center items-center rounded-full mt-5'></div>
            <h1 className='text-2xl mt-5'>Hello guy's</h1>
            <p className='flex justify-center items-center text-center mt-5 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, ex.</p>
          </div>

          <div className='box w-80 relative border border-gray-400 rounded-2xl h-80 flex hover:shadow-xl transition-all ease-in-out duration-300 cursor-pointer flex-col justify-start items-center'>
            <div className='w-30 h-30 border border-gray-400 flex justify-center items-center rounded-full mt-5'></div>
            <h1 className='text-2xl mt-5'>Hello guy's</h1>
            <p className='flex justify-center items-center text-center mt-5 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, ex.</p>
          </div>

          <div className='box w-80 relative border border-gray-400 rounded-2xl h-80 flex hover:shadow-xl transition-all ease-in-out duration-300 cursor-pointer flex-col justify-start items-center'>
            <div className='w-30 h-30 border border-gray-400 flex justify-center items-center rounded-full mt-5'></div>
            <h1 className='text-2xl mt-5'>Hello guy's</h1>
            <p className='flex justify-center items-center text-center mt-5 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, ex.</p>
          </div>
        </div>


      </div>
    </>
  )
}

export default About