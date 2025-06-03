import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CheckPlayer from './components/CheckPlayer';
import React from 'react'
import Head2HeadGames from './components/Head2HeadGames';
import LastNGames from './components/LastNGames';
import StatGraph from './components/StatGraph';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/check-player' element={<CheckPlayer />}></Route>
        <Route path='/head-to-head' element={<Head2HeadGames />}></Route>
        <Route path='/last-n-games' element={<LastNGames />}></Route>
        <Route path='/results' element={<StatGraph />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
