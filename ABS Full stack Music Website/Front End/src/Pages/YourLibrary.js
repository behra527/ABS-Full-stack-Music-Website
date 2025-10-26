import React from 'react';
import { Link } from 'react-router-dom';
import { useMusic } from '../contexts/MusicContext';

const YourLibrary = () => {
  const { 
    favoritePlaylists, 
    removeFavoritePlaylist, 
    favoriteArtists, 
    removeFavoriteArtist, 
    favoriteRadios, 
    removeFavoriteRadio, 
    favoriteAlbums, 
    removeFavoriteAlbum 
  } = useMusic();

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white border rounded-3xl">
      <h1 className="text-3xl font-bold mb-4">Your Library</h1>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Favorite Playlists</h2>
        {favoritePlaylists.length > 0 ? (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoritePlaylists.map((playlist, index) => (
              <li key={index} className="bg-blue rounded-lg shadow-md overflow-hidden relative">
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
                <button 
                  onClick={() => removeFavoritePlaylist(playlist.name)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite playlists added yet</p>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Favorite Artists</h2>
        {favoriteArtists.length > 0 ? (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoriteArtists.map((artist, index) => (
              <li key={index} className="bg-blue rounded-lg shadow-md overflow-hidden relative">
                <Link to={`/artists/${encodeURIComponent(artist.name)}`} className="block">
                  <div className="relative overflow-hidden w-full h-48">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="absolute inset-0 w-full h-full object-cover transition duration-300 transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
                  </div>
                </Link>
                <button 
                  onClick={() => removeFavoriteArtist(artist.name)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite artists added yet</p>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Favorite Radio Stations</h2>
        {favoriteRadios.length > 0 ? (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoriteRadios.map((radio, index) => (
              <li key={index} className="bg-blue rounded-lg shadow-md overflow-hidden relative">
                <Link to={`/radio/${encodeURIComponent(radio.id)}`} className="block">
                  <div className="relative overflow-hidden w-full h-48">
                    <img
                      src={radio.logo}
                      alt={radio.name}
                      className="absolute inset-0 w-full h-full object-cover transition duration-300 transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{radio.name}</h3>
                    <p className="text-sm text-white-400 mb-2">{radio.genre}</p>
                    <p className="text-sm text-white-300">Frequency: {radio.frequency}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => removeFavoriteRadio(radio.name)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite radio stations added yet</p>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Favorite Albums</h2>
        {favoriteAlbums.length > 0 ? (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoriteAlbums.map((album, index) => (
              <li key={index} className="bg-blue rounded-lg shadow-md overflow-hidden relative">
                <Link to={`/albums/${encodeURIComponent(album.name.toLowerCase().replace(' ', '-'))}`} className="block">
                  <div className="relative overflow-hidden w-full h-48">
                    <img
                      src={album.image}
                      alt={album.name}
                      className="absolute inset-0 w-full h-full object-cover transition duration-300 transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{album.name}</h3>
                    <p className="text-sm text-white-400 mb-2">{album.artist}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => removeFavoriteAlbum(album.name)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite albums added yet</p>
        )}
      </div>
    </div>
  );
};

export default YourLibrary;
