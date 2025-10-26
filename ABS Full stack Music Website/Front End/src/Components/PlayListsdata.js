import React from 'react';
import { Link } from 'react-router-dom';
import playlistsData from '../Api/playlistsData.json';

function PlayListsdata() {
  return (
    <div className="bg-gray-900 text-white min-h-screen border rounded-3xl">
      <section className="py-8 px-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-center">Playlists</h1>
        </div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {playlistsData.playlists.map((playlist, index) => (
            <li key={index} className="bg-blue rounded-lg shadow-md overflow-hidden">
              <Link to={`/playlists/${encodeURIComponent(playlist.name)}`} className="block">
                <div className="relative overflow-hidden w-full h-48">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="absolute inset-0 w-full h-full object-cover transition duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
                  <p className="text-sm text-white-400 mb-2">{playlist.description}</p>
                  <p className="text-sm text-white-300">Owner: {playlist.owner}</p>
                  <p className="text-sm text-white-300">Tracks: {playlist.tracks}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PlayListsdata;
