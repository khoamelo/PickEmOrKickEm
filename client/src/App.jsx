import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CheckPlayer from './components/CheckPlayer';
import React from 'react'
import Head2HeadGames from './components/Head2HeadGames';
import LastNGames from './components/LastNGames';
import StatGraph from './components/StatGraph';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route 
          path='/home' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
        <Route 
          path='/check-player' 
          element={
            <ProtectedRoute>
              <CheckPlayer />
            </ProtectedRoute>} />
        <Route 
          path='/head-to-head' 
          element={
            <ProtectedRoute>
              <Head2HeadGames />
            </ProtectedRoute>} />
        <Route 
          path='/last-n-games' 
          element={
            <ProtectedRoute>
              <LastNGames />
            </ProtectedRoute>} />
        <Route 
          path='/results' 
          element={
            <ProtectedRoute>
              <StatGraph />
            </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;
