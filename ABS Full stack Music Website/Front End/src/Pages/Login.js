import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Both email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white" style={{ backgroundImage: `url('background.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-[400px] h-auto rounded-lg">
        <div className="w-full bg-black bg-opacity-60 p-8 rounded-lg">
          <div className="text-left mb-6">
            <h2 className="text-3xl font-bold">LOG IN</h2>
            <p className="text-lg">Never Lost. Discover New Music.</p>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="p-1 block text-sm font-medium mb-2">Email</label>
              <input id="email" type="email" placeholder="Email" className="p-1 w-full bg-gray-800 py-2 px-4 rounded-full" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input id="password" type="password" placeholder="Password" className="w-full bg-gray-800 py-2 px-4 rounded-full" value={formData.password} onChange={handleChange} />
            </div>

            <button type="submit" className="w-full bg-green-500 py-2 rounded-full text-white font-bold mb-4">LOG IN</button>
          </form>

          <div className="mt-0.5 text-center">
            <a href="/signup" className="text-green-500 font-bold">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
