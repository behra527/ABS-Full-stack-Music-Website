import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    axios.post('http://localhost:3000/api/signup', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Signup failed. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white" style={{ backgroundImage: `url('background.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-cover bg-center w-[500px] h-auto p-8 rounded-lg">
        <div className="w-full bg-black bg-opacity-60 p-6 rounded-lg">
          <div className="text-left mb-6">
            <h2 className="text-3xl font-bold">SIGN UP</h2>
            <p className="text-lg">Never Lost. Discover New Music.</p>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                <input id="firstName" type="text" placeholder="First Name" className="w-full bg-gray-800 py-2 px-4 rounded-full focus:outline-none" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                <input id="lastName" type="text" placeholder="Last Name" className="w-full bg-gray-800 py-2 px-4 rounded-full focus:outline-none" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>

            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input id="email" type="email" placeholder="Email Address" className="w-full bg-gray-800 py-2 px-4 rounded-full mb-4 focus:outline-none" value={formData.email} onChange={handleChange} />

            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input id="password" type="password" placeholder="Password" className="w-full bg-gray-800 py-2 px-4 rounded-full mb-6 focus:outline-none" value={formData.password} onChange={handleChange} />

            <button type="submit" className="w-full bg-green-500 py-2 rounded-full text-white font-bold">CREATE ACCOUNT</button>
          </form>

          <div className="mt-4 text-center">
            <a href="/login" className="text-green-500 font-bold">Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
