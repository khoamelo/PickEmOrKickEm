import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle logic here later (authentication)
    navigate('/home');
  };

  return (
    <div id="login-page-container" className="flex flex-row h-screen bg-gradient-to-b from-blue-900 to-black">
      
      {/* Logo (left side) */}
      <div id="logo-container" className="flex flex-col justify-center items-center w-2/3 text-white">
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
              Pick Em'
            </span>
          </span>

          <span className="text-white -mt-20">Or</span>

          <span className="relative flex items-center ml-3">
            <span className="bg-gray-800 px-3 py-3 rounded-xl shadow-xl text-red-400 border-2 border-black rotate-20">
              Kick Em'
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
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-black">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your username"
                />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your password"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:text-green-400 transition duration-200"
                >
                Login
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;