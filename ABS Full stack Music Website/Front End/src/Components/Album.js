import React from 'react';
import albumsData from '../Api/rough.json';
import { Link } from 'react-router-dom';


function Album() {
  return (
    <div className="bg-gray-900 text-white min-h-screen border rounded-3xl">
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {albumsData.albums.map((album, index) => (
              <div key={index} className="group relative">
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-full h-64 object-cover rounded-lg shadow-lg transition duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-75 rounded-lg">
                  <Link
                    to={`/album/${album.name.toLowerCase().replace(' ', '-')}`}
                    className="text-white text-center text-lg font-bold hover:underline"
                  >
                    {album.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Album;
