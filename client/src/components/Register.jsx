import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4005';

const Register = () => {
  // State to hold form input values for name, email, and password
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Handle input changes for name, email, and password fields
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission for registration
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Send registration request to backend API with name, email, and password
      const res = await axios.post(`${API}/auth/registerUser`, form);
      // Store the JWT token in localStorage for authentication if successful
      localStorage.setItem('token', res.data.token);
      // Redirect to home page after successful registration
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='bg-gradient-to-b from-blue-900 to-black text-white flex flex-col items-center justify-center h-screen'>
        { /* Registration form */ }
        <span className='text-3xl font-bold mb-[20px]'>Register Here! 📝</span>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5 border-2 border-gray-600 p-[40px] bg-gray-800 rounded-lg shadow-xl'>
                <input 
                    name="name" 
                    placeholder="Name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className='border-2 border-gray-600 bg-gray-900 p-2'
                    required />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className='border-2 border-gray-600 bg-gray-900 p-2'
                    required />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={handleChange} 
                    className='border-2 border-gray-600 bg-gray-900 p-2'
                    required />
                <button 
                    type="submit" 
                    className='w-[150px] ml-[25px] mt-[20px] border2 border-gray-600 bg-gray-900 p-2 hover:bg-green-500 transition duration-300 rounded-xl cursor-pointer'>
                        Register
                </button>
            </div>
        </form>
    </div>
  );
};

export default Register;