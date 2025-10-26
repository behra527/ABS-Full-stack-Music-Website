import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import songsData from '../Api/songsData.json'; 
import artistsData from '../Api/artistsData.json';
import albumsData from '../Api/rough.json'; 
import radioData from '../Api/radioData.json'; 
import playlistsData from '../Api/playlistsData.json'; // Import playlists

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const filteredSongs = songsData?.songs?.filter(song =>
      song.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

    const filteredArtists = artistsData?.artists?.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

    const filteredAlbums = albumsData?.albums?.filter(album =>
      album.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

    const filteredRadios = radioData?.radioData?.filter(radio =>
      radio.name.toLowerCase().includes(query.toLowerCase())
    ) || [];
    

    const filteredPlaylists = playlistsData?.playlists?.filter(playlist =>
      playlist.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

    const combinedResults = [
      ...filteredSongs.map(song => ({ ...song, type: 'song' })),
      ...filteredArtists.map(artist => ({ ...artist, type: 'artist' })),
      ...filteredAlbums.map(album => ({ ...album, type: 'album' })),
      ...filteredRadios.map(radio => ({ ...radio, type: 'radio' })),
      ...filteredPlaylists.map(playlist => ({ ...playlist, type: 'playlist' })), // Include playlists
    ];

    if (combinedResults.length > 0) {
      setResults(combinedResults);
      setError('');
    } else {
      setResults([]);
      setError('No results found');
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white border rounded-3xl">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="mb-6 flex">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for songs, albums, artists, playlists..."
          className="bg-gray-800 focus:outline-none border border-gray-700 rounded-full py-2 px-4 w-full text-white"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-6 py-2 bg-white hover:bg-yellow-500 text-black rounded-full font-bold text-lg"
        >
          Search
        </button>
      </div>

      <div>
        {error && <p className="text-red-500">{error}</p>}
        {results.map((result) => (
          <div key={result.id} className="mb-6">
            {result.type === 'song' && (
              <div className="flex items-center text-lg">
                <Link
                  to={`/song/${result.id}`}
                  className="text-green-500 hover:underline font-semibold"
                >
                  {result.name}
                </Link>
                <span className="text-gray-500 ml-2">Song</span>
              </div>
            )}
            {result.type === 'album' && (
  <div className="flex items-center text-lg">
    <Link
      to={`/album/${result.name.toLowerCase().replace(' ', '-')}`}
      className="text-green-500 hover:underline font-semibold"
    >
      {result.name}
    </Link>
    <span className="text-gray-500 ml-2">Album</span>
  </div>
)}
            {result.type === 'artist' && (
              <div className="flex items-center text-lg">
                <Link
                  to={`/artists/${result.name}`}
                  className="text-green-500 hover:underline font-semibold"
                >
                  {result.name}
                </Link>
                <span className="text-gray-500 ml-2">Artist</span>
              </div>
            )}
            {result.type === 'radio' && (
              <div className="flex items-center text-lg">
                <Link
                  to={`/radio/${result.id}`}
                  className="text-green-500 hover:underline font-semibold"
                >
                  {result.name}
                </Link>
                <span className="text-gray-500 ml-2">Radio</span>
              </div>
            )}
           {result.type === 'playlist' && (
  <div className="flex items-center text-lg">
    <Link
      to={`/playlists/${encodeURIComponent(result.name)}`}
      className="text-green-500 hover:underline font-semibold"
    >
      {result.name}
    </Link>
    <span className="text-gray-500 ml-2">Playlist</span>
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
