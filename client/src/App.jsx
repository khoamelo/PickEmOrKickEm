import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CheckPlayer from './components/CheckPlayer';
import React from 'react'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/check-player' element={<CheckPlayer />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
