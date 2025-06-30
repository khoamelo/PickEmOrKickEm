import React, { useState } from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';

// Register the annotation plugin for Chart.js
ChartJS.register(annotationPlugin);

const StatGraph = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve player data, H2H data, game data, selected stat, and prop line from the location state
  const playerData = location.state?.playerData;
  const h2hData = location.state?.h2hData || [];
  const gameData = location.state?.gameData || [];
  const selectedStat = location.state?.selectedStat;
  const propLine = location.state?.propLine;
  const [minsPlayed, setMinsPlayed] = useState(68);

  // Use head-to-head data if available, otherwise use game data
  const rawChartData = h2hData.length > 0 ? h2hData : gameData;
  // Filter chart data based on minutes played
  const chartData = rawChartData.filter(game => game.min <= minsPlayed);

  // Function to compute state value for a game, supporting combined stats (e.g., "pts + ast")
  const computeStat = (game) => {
    if (selectedStat.includes('+')) {
      return selectedStat
        // Split the selected stat into individual stats in an array
        .split('+')
        // Trim whitespace from each stat and set each stat to its value in the game object
        .map(stat => game[stat.trim()])
        // Add all numbers in the array together
        .reduce((a, b) => a + b, 0);
    }
    // If no '+' in selectedStat, return the value directly from the game object
    return game[selectedStat];
  };

  // Calculate counts for above, equal, and below prop line
  const totalGames = chartData.length || 1;
  const aboveCount = chartData.filter(g => computeStat(g) > propLine).length;
  const equalCount = chartData.filter(g => computeStat(g) === propLine).length;
  const belowCount = chartData.filter(g => computeStat(g) < propLine).length;

  // Prepare data for the half doughnut charts
  const halfDoughnutData = (count, total, color) => ({
    labels: ['', ''],
    datasets: [{
      data: [count, total - count],
      backgroundColor: [color, 'rgba(255, 255, 255, 0.1)'],
      borderWidth: 0,
    }]
  });

  // Options for the half doughnut charts
  // Set the circumference to 180 degrees, rotation to 270 degrees, and cutout
  const halfDoughnutOptions = {
    circumference: 180,
    rotation: 270,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.dataIndex === 0) {
              const val = ctx.parsed;
              const totalVal = val + ctx.chart.data.datasets[0].data[1];
              const percent = ((val / totalVal) * 100).toFixed(1);
              return `${percent}%`;
            }
            return '';
          }
        }
      }
    }
  };

  return (
    <div className='text-xl flex flex-col md:flex-row items-center justify-center gap-6 h-screen bg-gradient-to-b from-blue-900 to-black text-white overflow-x-hidden px-4'>

      { /* Player Info Section and Navigation buttons */}
      <div id='player_info' className='flex flex-col items-center justify-center gap-4 mb-4 w-full md:w-1/3'>
        <h2><span className='font-bold mr-2'>Player ID:</span>{playerData.player_id}</h2>
        <p><span className='font-bold mr-2'>Name:</span>{playerData.full_name}</p>
        <img
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerData.player_id}.png`}
          className='h-[150px] w-[205.5px] bg-gray-900 rounded-full border-2 border-gray-600 shadow-xl p-2 hover:bg-green-500 transition duration-300'
          alt={`${playerData.full_name} headshot`}
        />
        <div id='buttons' className='flex flex-col gap-10 text-base'>
          <button
            className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-red-500 hover:outline-none hover:border-red-500 transition duration-300'
            onClick={() => navigate('/check-player', { state: { playerData } })}>
            ⬅️ Back to Search
          </button>
          <button
            className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-green-500 hover:outline-none hover:border-green-500 transition duration-300'
            onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div id='chart_gauge_slide'className='flex flex-col w-full md:w-2/3 -mt-[30px]'>
        
        {/* Half-doughnut charts for Over, Push, Under */}
        <div id='gauges' className="flex justify-around gap-1 mb-1 -mt-[90px] text-sm">
          {/* Over gauge */}
          <div className="flex flex-col items-center text-white">
            <h4 className="mt-[70px] mb-[5px] font-bold w-[120px] text-center truncate">Over {propLine} {selectedStat}</h4>
            <Doughnut
              data={halfDoughnutData(aboveCount, totalGames, 'rgba(0, 255, 0, 0.7)')}
              options={halfDoughnutOptions}
              height={120}
              width={120}
              className='-mt-[30px]'
            />
            <p className="-mt-[60px] text-sm">{((aboveCount / totalGames) * 100).toFixed(1)}%</p>
          </div>
          {/* Push gauge */}
          <div className="flex flex-col items-center text-white">
            <h4 className="mt-[70px] mb-[5px] font-bold w-[120px] text-center truncate">Pushed {propLine} {selectedStat}</h4>
            <Doughnut
              data={halfDoughnutData(equalCount, totalGames, 'rgba(128, 128, 128, 0.7)')}
              options={halfDoughnutOptions}
              height={120}
              width={120}
              className='-mt-[30px]'
            />
            <p className="-mt-[60px] text-sm">{((equalCount / totalGames) * 100).toFixed(1)}%</p>
          </div>
          {/* Under gauge */}
          <div className="flex flex-col items-center text-white">
            <h4 className="mt-[70px] mb-[5px] font-bold w-[120px] text-center truncate">Under {propLine} {selectedStat}</h4>
            <Doughnut
              data={halfDoughnutData(belowCount, totalGames, 'rgba(255, 0, 0, 0.7)')}
              options={halfDoughnutOptions}
              height={120}
              width={120}
              className='-mt-[30px]'
            />
            <p className="-mt-[60px] text-sm">{((belowCount / totalGames) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Bar chart for game stats */}
        <div id='bar_chart' className="w-full h-[400px] bg-gray-900 rounded-xl border-2 border-gray-600 p-4">
          <Bar
            data={{
              labels: chartData.map(game => `${game.game_date} ${game.matchup}`),
              datasets: [{
                label: selectedStat,
                data: chartData.map(game => computeStat(game)),
                backgroundColor: chartData.map(game => {
                  const stat = computeStat(game);
                  if (stat > propLine) return 'rgba(0, 255, 0, 0.6)';
                  if (stat === propLine) return 'rgba(128, 128, 128, 0.6)';
                  return 'rgba(255, 0, 0, 0.6)';
                }),
                borderColor: chartData.map(game => {
                  const stat = computeStat(game);
                  if (stat > propLine) return 'rgba(0, 128, 0, 1)';
                  if (stat === propLine) return 'rgba(105, 105, 105, 1)';
                  return 'rgba(139, 0, 0, 1)';
                }),
                borderWidth: 1,
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      yMin: propLine,
                      yMax: propLine,
                      borderColor: 'rgb(249, 247, 247)',
                      borderWidth: 2,
                      label: {
                        content: `Prop Line: ${propLine}`,
                        enabled: true,
                        position: 'center',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        color: 'white',
                      },
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  border: { color: 'rgb(255, 255, 255)', width: 1 },
                  ticks: { color: 'rgb(255, 255, 255)' }
                },
                x: {
                  border: { color: 'rgb(255, 255, 255)', width: 1 },
                  ticks: { color: 'rgb(255, 255, 255)' }
                }
              },
            }}
          />

          {/* Slider to filter games by minutes played */}
          <div id='minute-slider' className='mt-[20px] ml-[320px]'>
            <input
              type="range"
              min="1"
              max="68"
              value={minsPlayed}
              onChange={(e) => setMinsPlayed(Number(e.target.value))}
              className="h-3 w-[145px] cursor-pointer appearance-none rounded-xl bg-gray-600 border-1
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:w-5 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-[url('https://png.pngtree.com/element_our/20190528/ourmid/pngtree-round-cartoon-basketball-image_1145574.jpg')] 
              [&::-webkit-slider-thumb]:bg-contain 
              [&::-webkit-slider-thumb]:bg-no-repeat 
              [&::-webkit-slider-thumb]:bg-center 
              [&::-webkit-slider-thumb]:border-none"
            />
            <p className="text-white text-sm -mt-[4px] ml-[5px]">Minutes played: &le; {minsPlayed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatGraph;