import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaMusic, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <img src="/Images/Without.png" alt="ABS MUSIC" className="w-full h-auto" />
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/search" className="flex items-center space-x-2">
            <FaSearch className="w-5 h-5" />
            <span>Search</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/your-library" className="flex items-center space-x-2">
            <FaMusic className="w-5 h-5" />
            <span>Your Library</span>
          </Link>
        </li>
        {token && (
          <li className="mt-auto mb-4">
            <button onClick={handleLogout} className="flex items-center space-x-2 w-full text-left">
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
