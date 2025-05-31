import { useLocation } from 'react-router-dom';

const CheckPlayer = () => {
  const location = useLocation();
  const playerData = location.state?.playerData;

  if (!playerData) {
    return <p>No player data found.</p>;
  }

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
        className='h-[150px] w-[205.5px], bg-gray-900 rounded-full border-2 border-gray-600 shadow-xl p-2 hover:bg-green-500 transition duration-300' 
      />

      <button
        className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-green-500 hover:outline-none hover:border-green-500 transition duration-300'
        onClick={() => window.location.href = '/home'} >
            Back to Search
      </button>
    </div>


  );
};

export default CheckPlayer;