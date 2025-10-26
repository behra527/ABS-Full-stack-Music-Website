import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Search from './Pages/Search';
import YourLibrary from './Pages/YourLibrary';
import './index.css'; 
import Footer from './Components/Footer';
import Player from './Components/Player';
import AlbumDetails from './Components/AlbumDetails';
import ArtistDetail from './Components/ArtistDetail';
import PlaylistDetail from './Components/PlaylistDetail';
import RadioDetail from './Components/RadioDetail';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/album/:id" element={<PrivateRoute><AlbumDetails /></PrivateRoute>} />
            <Route path="/artists/:name" element={<PrivateRoute><ArtistDetail /></PrivateRoute>} />
            <Route path="/playlists/:name" element={<PrivateRoute><PlaylistDetail /></PrivateRoute>} />
            <Route path="/radio/:id" element={<PrivateRoute><RadioDetail /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="/your-library" element={<PrivateRoute><YourLibrary /></PrivateRoute>} />
            
          </Routes>

           <Footer />
        </div>
         <Player />
      </div>
    </Router>
  );
}

export default App;
