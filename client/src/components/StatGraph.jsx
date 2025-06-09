import React from 'react'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { useLocation } from 'react-router-dom'

ChartJS.register(annotationPlugin);

const StatGraph = () => {

  const location = useLocation()
  const playerData = location.state?.playerData
  const h2hData = location.state?.h2hData || []
  const gameData = location.state?.gameData || []
  const selectedStat = location.state?.selectedStat
  const propLine = location.state?.propLine
  const chartData = h2hData.length > 0 ? h2hData : gameData

  return (
    <div className='text-xl flex flex-col md:flex-row items-center justify-center gap-4 h-screen bg-gradient-to-b from-blue-900 to-black text-white overflow-x-hidden px-4'>
      <div className='flex flex-col items-center justify-center gap-4 mb-4'>
        <h2>
          <span className='font-bold mr-2'>Player ID:</span>
          {playerData.player_id}
        </h2>
        <p>
          <span className='font-bold mr-2'>Name:</span>
          {playerData.full_name}
        </p>

        <img 
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerData.player_id}.png`} 
          className='h-[150px] w-[205.5px] bg-gray-900 rounded-full border-2 border-gray-600 shadow-xl p-2 hover:bg-green-500 transition duration-300' 
        />
        <div id='buttons' className='flex flex-row gap-10 text-base'>
          <button
            className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-red-500 hover:outline-none hover:border-red-500 transition duration-300'
            onClick={() => window.history.back()} >
              ⬅️ Back to Search
          </button>
          <button
            className='bg-gray-900 w-[205.5px] text-white border-2 border-gray-600 px-6 py-3 hover:text-green-500 hover:outline-none hover:border-green-500 transition duration-300'
            onClick={() => window.location.reload()} >
              Refresh
          </button>
        </div>

      </div>

      <div id='bar_chart' className="w-full md:w-3/4 h-[400px] bg-gray-900 rounded-xl border-2 border-gray-600 p-4">
        <Bar 
          data={{
            labels: chartData.map(game => `${game.game_date} ${game.matchup}`),
            datasets: [{
              label: `${selectedStat}`,
              data: chartData.map(game => game[selectedStat]),
              backgroundColor: chartData.map(game => {
                const stat = game[selectedStat];
                if (stat > propLine) return 'rgba(0, 255, 0, 0.6)';
                if (stat === propLine) return 'rgba(128, 128, 128, 0.6)';
                return 'rgba(255, 0, 0, 0.6)';
              }),
              borderColor: chartData.map(game => {
                const stat = game[selectedStat];
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
              legend: {
                display: false,
              },
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
                border: {
                  color: 'rgb(255, 255, 255)',
                  width: 1
                },
                ticks: {
                  color: 'rgb(255, 255, 255)'
                }
              },
              x: {
                border: {
                  color: 'rgb(255, 255, 255)',
                  width: 1
                },
                ticks: {
                  color: 'rgb(255, 255, 255)'
                }
              }
            },
          }}
        />
      </div>

    </div>
  )
}

export default StatGraph