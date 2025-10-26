import React from 'react';
import artistsData from '../Api/artistsData.json';
import { Link } from 'react-router-dom';

function Arti() {
  return (
    <div className="bg-gray-900 text-white min-h-screen border rounded-3xl">
      <section className="py-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center mb-8">Popular Artists</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {artistsData.artists.map((artist, index) => (
            <div key={index} className="group">
              <Link
                to={`/artists/${encodeURIComponent(artist.name)}`}
                className="relative block rounded-full overflow-hidden border-4 border-gray-800 hover:border-white"
                style={{ width: "160px", height: "160px" }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="text-white text-lg font-bold text-center">{artist.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Arti;
