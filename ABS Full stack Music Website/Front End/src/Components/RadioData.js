import React from 'react';
import { Link } from 'react-router-dom';
import radioData from '../Api/radioData.json';

const Radio = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen border rounded-3xl">
      <section className="py-8 px-6">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-3xl font-bold text-center">Popular Radio</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {radioData.radioData.map((station) => (
            <Link to={`/radio/${station.id}`} key={station.id} className="block">
              <div className="bg-blue rounded-lg shadow-md overflow-hidden p-6">
                <img src={station.logo} alt={station.name} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-lg font-semibold mb-2">{station.name}</h3>
                <p className="text-sm text-white-600 mb-2">{station.genre}</p>
                <p className="text-sm text-white-700">{station.description}</p>
                <p className="text-sm text-white-700">Frequency: {station.frequency}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Radio;
