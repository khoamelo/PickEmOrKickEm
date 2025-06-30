import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Head2HeadGames = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playerData = location.state?.playerData;

  const [selectedStat, setSelectedStat] = useState('');
  const [propLine, setPropLine] = useState('');
  const [oppTeam, setOppTeam] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!oppTeam || !propLine || !selectedStat) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:4005/api/v1/getHeadToHead/${playerData.player_id}/${oppTeam}`
      );

      console.log('Player H2H data:', data);

      navigate('/results', {
        state: {
          playerData,
          h2hData: data.data.h2h_games,
          selectedStat,
          propLine: parseFloat(propLine),
          oppTeam,
        }
      });
    } catch (error) {
      console.error('Error fetching player data:', error.response?.data || error.message);
      alert('Head-to-head data not found');
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
        <div id='selections' className='flex flex-row items-center justify-center gap-10 w-full max-w-md '>
            {/* Dropdown for stat selection */}
            <label className=''>
                <span className='font-bold mb-1'>Select Stat:</span>
                <select 
                    value={selectedStat} 
                    onChange={(e) => setSelectedStat(e.target.value)} 
                    className='text-white p-2 rounded-xl bg-gray-900 border-2 border-gray-600 focus:outline-none focus:border-green-500 focus:text-green-500 transition duration-300'
                >
                    <option value="" disabled> --Select Stat--</option>
                    <option value="pts">Points</option>
                    <option value="reb">Rebounds</option>
                    <option value="dreb">Defensive Rebounds</option>
                    <option value="oreb">Offensive Rebounds</option>
                    <option value="ast">Assists</option>
                    <option value="blk">Blocked Shots</option>
                    <option value="stl">Steals</option>
                    <option value="tov">Turnovers</option>
                    <option value="fg3m">3-PT Made</option>
                    <option value="fg3a">3-PT Attempted</option>
                    <option value="fga">FG Attempted</option>
                    <option value="ftm">Free Throws Made</option>
                    <option value="pts+ast">Pts+Asts</option>
                    <option value="reb+ast">Rebs+Asts</option>
                    <option value="pts+reb">Pts+Rebs</option>
                    <option value="blk+stl">Blks+Stls</option>
                    <option value="pts+reb+ast">Pts+Rebs+Asts</option>
                </select>
            </label>

            {/* Input for prop line */}
            <label className=''>
                <span className='mb-1 font-bold'>Prop Line:</span>
                <input 
                    type='number' 
                    step='0.5'
                    min='0'
                    value={propLine} 
                    onChange={(e) => setPropLine(e.target.value)} 
                    className='text-white p-2 rounded-xl bg-gray-900 border-2 border-gray-600 focus:outline-none focus:border-green-500 focus:text-green-500 transition duration-300' 
                    placeholder='e.g., 27.5'
                />
            </label>

            {/* Input for opposing team */}
            <label className=''>
                <span className='font-bold mb-1'>Opposing Team:</span>
                <select 
                    value={oppTeam} 
                    onChange={(e) => setOppTeam(e.target.value)} 
                    className='text-white p-2 rounded-xl bg-gray-900 border-2 border-gray-600 focus:outline-none focus:border-green-500 focus:text-green-500 transition duration-300'
                    placeholder='Select opposing team'
                >
                    <option value="" disabled> --Select Opposing Team--</option>
                    <option value="ATL">Atlanta Hawks</option>
                    <option value="BOS">Boston Celtics</option>
                    <option value="BKN">Brooklyn Nets</option>
                    <option value="CHA">Charlotte Hornets</option>
                    <option value="CHI">Chicago Bulls</option>
                    <option value="CLE">Cleveland Cavaliers</option>
                    <option value="DAL">Dallas Mavericks</option>
                    <option value="DEN">Denver Nuggets</option>
                    <option value="DET">Detroit Pistons</option>
                    <option value="GSW">Golden State Warriors</option>
                    <option value="HOU">Houston Rockets</option>
                    <option value="IND">Indiana Pacers</option>
                    <option value="LAC">Los Angeles Clippers</option>
                    <option value="LAL">Los Angeles Lakers</option>
                    <option value="MEM">Memphis Grizzlies</option>
                    <option value="MIA">Miami Heat</option>
                    <option value="MIL">Milwaukee Bucks</option>
                    <option value="MIN">Minnesota Timberwolves</option>
                    <option value="NOP">New Orleans Pelicans</option>
                    <option value="NYK">New York Knicks</option>
                    <option value="OKC">Oklahoma City Thunder</option>
                    <option value="ORL">Orlando Magic</option>
                    <option value="PHI">Philadelphia 76ers</option>
                    <option value="PHX">Phoenix Suns</option>
                    <option value="POR">Portland Trail Blazers</option>
                    <option value="SAC">Sacramento Kings</option>
                    <option value="SAS">San Antonio Spurs</option>
                    <option value="TOR">Toronto Raptors</option>
                    <option value="UTA">Utah Jazz</option>
                    <option value="WAS">Washington Wizards</option>
                </select>
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

export default Head2HeadGames;