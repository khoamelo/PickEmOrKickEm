import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/check-player');
  };

  return (
    <div id='home-container' className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-black text-white gap-5'>
        {/* Welcome Message */}
        <h1 id='welcome-message' className='text-4xl font-bold'>
          🏀 Welcome to 
          <span className='shadow-xl ml-[12px] mr-[12px] text-green-500 bg-gray-900 p-2.5 rounded-xl border-2 border-black'>
            Pick Em'
          </span> 
          Or 
          <span className='shadow-xl ml-[12px] mr-[12px] text-red-500 bg-gray-900 p-2.5 rounded-xl border-2 border-black'>
            Kick Em'
          </span> 
          🏀
        </h1>

        {/* Player Search Input */}
        <div id='player-search' className='mt-5'>
          <form onSubmit={handleSearch}>
            <input 
            type='text' 
            placeholder='Enter Player Name...' 
            className='p-3 bg-gray-900 text-white border-2 border-gray-600 focus:outline-none focus:border-green-500 transition duration-300 w-[360px]'
            />
            <button className='bg-gray-900 text-white border-2 border-gray-600 px-6 py-3 hover:text-green-500 hover:outline-none hover:border-green-500 transition duration-300 ml-1'>
              Search
            </button>
          </form>
        </div>

        {/* Instructions */}
        <p id='instructions'>
          Enter the name of the NBA player you want to view stats for...
        </p>
    </div>
  )
}

export default Home