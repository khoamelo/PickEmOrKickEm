import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4005';

const Login = () => {
  const navigate = useNavigate();
  // State to hold form data and error messages
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Handle input changes for email and password fields
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission for login
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      // Send login request to backend API with email and password
      const res = await axios.post(`${API}/auth/loginUser`, form);
      // Store the JWT token in localStorage for authentication if successful
      localStorage.setItem('token', res.data.token);

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div id="login-page-container" className="flex flex-row h-screen bg-gradient-to-b from-blue-900 to-black">
      
      {/* Logo (left side) */}
      <div id="logo-container" className="flex flex-col justify-center items-center w-2/3 text-white mt-13">
        <h1 className="text-5xl font-bold flex items-center gap-2">
          <span className="relative flex items-center mr-3">
            <img
              src='/images/thumbs_up.png'
              alt="Thumbs Up"
              className="w-[52px] h-[52px] absolute left-[65px] -top-[55px] -rotate-20"
            />
            <img
              src='/images/cursor.png'
              alt="Cursor"
              className="w-10 h-10 absolute left-[110px] top-[50px] -rotate-20 z-10"
            />
            <span className="bg-gray-800 px-3 py-3 rounded-xl shadow-xl text-green-400 border-2 border-black -rotate-20">
              Pick 'Em
            </span>
          </span>

          <span className="text-white -mt-20">Or</span>

          <span className="relative flex items-center ml-3">
            <span className="bg-gray-800 px-3 py-3 rounded-xl shadow-xl text-red-400 border-2 border-black rotate-20">
              Kick 'Em
            </span>
            <img
              src='/images/thumbs_down.png'
              alt="Thumbs Down"
              className="w-[52px] h-[52px] absolute right-[65px] -top-[55px] rotate-20"
            />
          </span>
        </h1>

        <div id="images" className="flex flex-row justify-center items-center mt-5 gap-0">
          <img
            src="/images/curry2_pic.png"
            alt="Curry"
            className="w-[120px] h-[140px]"
          />
          <img
            src="/images/giannis_pic.png"
            alt="Giannis"
            className="w-[140px] h-[140px]"
          />
          <img
            src="/images/lebron_pic.png"
            alt="LeBron"
            className="w-[140px] h-[140px]"
          />
        </div>
      </div>

      {/* Login box (right side) */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-white -ml-15 border-2 border-gray-600">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 bg-gray-900 rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 bg-gray-900 rounded-lg"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <button
              type="submit"
              className="w-[200px] ml-[95px] mt-[15px] bg-gray-900 text-white py-2 rounded-lg border-1 hover:bg-green-400 transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center text-white">
            <span>Don't have an account? </span>
            <button
              className="text-blue-600 underline hover:text-blue-800 transition duration-200 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;