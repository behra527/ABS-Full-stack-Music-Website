import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

import artistsData from '../Api/artistsData.json'; 
import albumsData from '../Api/rough.json'; 
import radioData from '../Api/radioData.json';
import playlistsData from '../Api/playlistsData.json';

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const PopularSection = () => {
  return (
    <div className="bg-gray-900 text-white container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Popular artists</h2>
        <Link to="/artists" className="text-white">Show All</Link>
      </div>
      <Slider {...sliderSettings}>
        {artistsData.artists.map((artist, index) => (
          <div key={index} className="min-w-max p-2 rounded-md group hover:bg-gray-800 transition duration-300">
            <img src={artist.image} alt={artist.name} className="w-24 h-24 object-cover rounded-full mx-auto" />
            <p className="mt-2 text-lg text-center">{artist.name}</p>
          </div>
        ))}
      </Slider>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold">Popular albums</h2>
        <Link to="/albums" className="text-white">Show All</Link>
      </div>
      <Slider {...sliderSettings}>
        {albumsData.albums.map((album, index) => (
          <div key={index} className="min-w-max p-2 rounded-md group hover:bg-gray-800 transition duration-300">
            <img src={album.cover} alt={album.title} className="w-48 h-48 object-cover rounded-md ml-10" />
            <h3 className="mt-2 text-lg text-center">{album.title}</h3>
            <p className="text-gray-400 text-center">{album.artist}</p>
          </div>
        ))}
      </Slider>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold">Popular radio stations</h2>
        <Link to="/radio" className="text-white">Show All</Link>
      </div>
      <Slider {...sliderSettings}>
        {radioData.radioData.map((station, index) => (
          <div key={index} className="min-w-max p-2 rounded-md group hover:bg-gray-800 transition duration-300">
            <img src={station.logo} alt={station.name} className="w-48 h-48 object-cover rounded-md ml-10" />
            <h3 className="mt-2 text-lg text-center">{station.name}</h3>
            <p className="text-gray-400 text-center">{station.genre}</p>
          </div>
        ))}
      </Slider>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold">Popular playlists</h2>
        <Link to="/playlists" className="text-white">Show All</Link>
      </div>
      <Slider {...sliderSettings}>
        {playlistsData.playlists.map((playlist, index) => (
          <div key={index} className="min-w-max p-2 rounded-md group hover:bg-gray-800 transition duration-300">
            <img src={playlist.image} alt={playlist.name} className="w-48 h-48 object-cover rounded-md ml-10" />
            <h3 className="mt-2 text-lg text-center">{playlist.name}</h3>
            <p className="text-gray-400 text-center">Owner: {playlist.owner}</p>
            <p className="text-gray-400 text-center">Tracks: {playlist.tracks}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularSection;
