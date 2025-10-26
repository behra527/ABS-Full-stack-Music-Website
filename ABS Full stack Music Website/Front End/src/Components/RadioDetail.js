import React from 'react';
import { useParams } from 'react-router-dom';
import { useMusic } from '../contexts/MusicContext'; 
import radioData from '../Api/radioData.json';

const RadioDetail = () => {
  const { id } = useParams();
  const { playTrack, addFavoriteRadio } = useMusic(); // Destructure addFavoriteRadio
  const station = radioData.radioData.find(station => station.id === parseInt(id, 10));

  if (!station) {
    return <p>Radio station not found</p>;
  }

  const songs = station.songs || [];

  const handlePlaySong = (song, index) => {
    playTrack({
      playlist: station,
      currentIndex: index,
      track: {
        name: song.name,
        url: song.SongPath,
        image: song.imagePath,
        artist: station.name, 
      },
    });
  };

  const handleAddToFavorites = () => {
    addFavoriteRadio(station);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen border rounded-3xl">
      <section className="py-8 px-6">
        <div className="mb-4 text-center">
          <img src={station.logo} alt={station.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h1 className="text-3xl font-bold">{station.name}</h1>
          <p className="text-lg mb-4">{station.description}</p>
          <button 
            onClick={handleAddToFavorites} 
            className="text-yellow-500 hover:text-yellow-400 transition duration-300"
          >
            ★ Add to Favorites
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 mb-4 text-center">
          <p className="text-sm text-gray-400 mb-2">Genre: {station.genre}</p>
          <p className="text-sm text-gray-300">Frequency: {station.frequency}</p>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <div 
                key={song.id} 
                className="bg-gray-800 rounded-lg shadow-md p-4"
                onClick={() => handlePlaySong(song, index)} 
              >
                <img 
                  src={song.imagePath} 
                  alt={song.name} 
                  className="w-full h-32 object-cover rounded-lg mb-2" 
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
            <p>No songs available for this radio station</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RadioDetail;
