import React from 'react';
import { useParams } from 'react-router-dom';
import { useMusic } from '../contexts/MusicContext'; // Import useMusic
import playlistsData from '../Api/playlistsData.json';

function PlaylistDetail() {
  const { name } = useParams();
  const { playTrack, addFavoritePlaylist } = useMusic(); // Destructure addFavoritePlaylist from useMusic
  const playlist = playlistsData.playlists.find(p => p.name === decodeURIComponent(name));

  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  const songs = playlist.songs || [];

  const handlePlaySong = (song, index) => {
    playTrack({
      playlist,
      currentIndex: index,
      track: {
        name: song.name,
        url: song.SongPath,
        image: song.ImagePath,
        artist: playlist.owner,
      },
    });
  };

  const handleAddToFavorites = () => {
    addFavoritePlaylist(playlist);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen border rounded-3xl">
      <section className="py-8 px-6">
        <div className="mb-4 text-center">
          <img src={playlist.image} alt={playlist.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h1 className="text-3xl font-bold">{playlist.name}</h1>
          <p className="text-lg mb-4">{playlist.description}</p>
          <button 
            onClick={handleAddToFavorites} 
            className="text-yellow-500 hover:text-yellow-400 transition duration-300"
          >
            ★ Add to Favorites
          </button>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <div key={song.id} className="bg-gray-800 rounded-lg shadow-md p-4">
                <img 
                  src={song.ImagePath} 
                  alt={song.name} 
                  className="w-full h-32 object-cover rounded-lg mb-2" 
                  onClick={() => handlePlaySong(song, index)} 
                />
                <h3 className="text-lg font-semibold">{song.name}</h3>
                <button 
                  className="mt-2 text-blue-500 underline"
                  onClick={() => handlePlaySong(song, index)}
                >
                  Play
                </button>
              </div>
            ))
          ) : (
            <p>No songs available for this playlist</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default PlaylistDetail;
