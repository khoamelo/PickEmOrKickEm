import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LastNGames = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playerData = location.state?.playerData;

  const [selectedStat, setSelectedStat] = useState('');
  const [propLine, setPropLine] = useState('');
  const [numGames, setNumGames] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!numGames || !propLine || !selectedStat) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:4005/api/v1/getGames/${playerData.player_id}?n=${numGames}`
      );

      console.log('Player games:', data);

      navigate('/results', {
        state: {
          playerData,
          gameData: data.data.games,
          selectedStat,
          propLine: parseFloat(propLine),
          numGames: parseInt(numGames),
        }
      });
    } catch (error) {
      console.error('Error fetching player data:', error.response?.data || error.message);
      alert('Games not found');
    }
  };
  
  return (
    <div className='text-xl flex flex-col items-center justify-center gap-4 h-screen bg-gradient-to-b from-blue-900 to-black text-white'>
      <h2>
        <span className='font-bold mr-2'>
          Player ID:
        </span>
        {playerData.player_id}
      </h2>
      <p>
        <span className='font-bold mr-2'>
          Name:
        </span>
        {playerData.full_name}
      </p>

      <img 
        src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerData.player_id}.png`} 
        className='h-[150px] w-[205.5px] bg-gray-900 rounded-full border-2 border-gray-600 shadow-xl p-2 hover:bg-green-500 transition duration-300' 
      />

      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-full max-w-md'>
        <div id='selections' className='flex flex-row items-center justify-center gap-10 w-full'>
          {/* Dropdown for stat selection */}
          <label>
            <span className='font-bold mb-1'>Select Stat:</span>
            <select 
              value={selectedStat} 
              onChange={(e) => setSelectedStat(e.target.value)} 
              className='text-white p-2 rounded-xl bg-gray-900 border-2 border-gray-600 focus:outline-none focus:border-green-500'
            >
              <option value="" disabled> --Select Stat--</option>
              <option value="pts">Points</option>
              <option value="reb">Rebounds</option>
              <option value="ast">Assists</option>
              <option value="blk">Blocked Shots</option>
            </select>
          </label>

          {/* Input for prop line */}
          <label>
            <span className='mb-1 font-bold'>Prop Line:</span>
            <input 
              type='number' 
              step='0.5'
              value={propLine} 
              onChange={(e) => setPropLine(e.target.value)} 
              className='text-white p-2 rounded-xl bg-gray-900 border-2 border-gray-600 focus:outline-none focus:border-green-500' 
              placeholder='e.g., 27.5'
            />
          </label>

          {/* Input for number of games */}
          <label>
            <span className='mb-1 font-bold'>Number of Games:</span>
            <input 
              type='number' 
              value={numGames} 
              onChange={(e) => setNumGames(e.target.value)} 
              className='text-white p-2 rounded-xl bg-gray-900 border-2 border-gray-600 focus:outline-none focus:border-green-500' 
              placeholder='e.g., 5'
            />
          </label>
        </div>

        <div id='nav-buttons' className='flex flex-row gap-10 text-base mt-5'>
          <button
            type='button'
            className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-red-500 hover:outline-none hover:border-red-500 transition duration-300'
            onClick={() => navigate('/check-player', { state: { playerData } })}
          >
            ⬅️ Return
          </button>
          <button
            type='submit'
            className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-green-500 hover:outline-none hover:border-green-500 transition duration-300'
          >
            Submit ➡️
          </button>
        </div>
      </form>

    </div>
  );
};

export default LastNGames;