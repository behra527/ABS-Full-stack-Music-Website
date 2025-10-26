import React, { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favoritePlaylists, setFavoritePlaylists] = useState([]); 
  const [favoriteArtists, setFavoriteArtists] = useState([]); 
  const [favoriteRadios, setFavoriteRadios] = useState([]); 
  const [favoriteAlbums, setFavoriteAlbums] = useState([]); 

  const playTrack = ({ playlist, currentIndex, track }) => {
    setPlaylist(playlist);
    setCurrentIndex(currentIndex);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

 const playNextTrack = () => {
    if (playlist && currentIndex < playlist.songs.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextTrack = playlist.songs[nextIndex];
        playTrack({
            playlist,
            currentIndex: nextIndex,
            track: {
                name: nextTrack.name,
                url: nextTrack.songpath,
                image: nextTrack.imagepath,
                artist: playlist.name || playlist.owner,
            },
        });
    }
};

const playPreviousTrack = () => {
    if (playlist && currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        const prevTrack = playlist.songs[prevIndex];
        playTrack({
            playlist,
            currentIndex: prevIndex,
            track: {
                name: prevTrack.name,
                url: prevTrack.songpath,
                image: prevTrack.imagepath,
                artist: playlist.name || playlist.owner,
            },
        });
    }
};

  const addFavoritePlaylist = (playlist) => {
    if (!favoritePlaylists.some((fav) => fav.name === playlist.name)) {
      setFavoritePlaylists([...favoritePlaylists, playlist]);
    }
  };

  const removeFavoritePlaylist = (playlistName) => {
    setFavoritePlaylists(favoritePlaylists.filter((fav) => fav.name !== playlistName));
  };

  const addFavoriteArtist = (artist) => {
    if (!favoriteArtists.some((fav) => fav.name === artist.name)) {
      setFavoriteArtists([...favoriteArtists, artist]);
    }
  };

  const removeFavoriteArtist = (artistName) => {
    setFavoriteArtists(favoriteArtists.filter((fav) => fav.name !== artistName));
  };

  const addFavoriteRadio = (radio) => {
    if (!favoriteRadios.some((fav) => fav.name === radio.name)) {
      setFavoriteRadios([...favoriteRadios, radio]);
    }
  };

  const removeFavoriteRadio = (radioName) => {
    setFavoriteRadios(favoriteRadios.filter((fav) => fav.name !== radioName));
  };

  const addFavoriteAlbum = (album) => {
    if (!favoriteAlbums.some((fav) => fav.name === album.name)) {
      setFavoriteAlbums([...favoriteAlbums, album]);
    }
  };

  const removeFavoriteAlbum = (albumName) => {
    setFavoriteAlbums(favoriteAlbums.filter((fav) => fav.name !== albumName));
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        playNextTrack,
        playPreviousTrack,
        favoritePlaylists,
        addFavoritePlaylist,
        removeFavoritePlaylist,
        favoriteArtists,
        addFavoriteArtist,
        removeFavoriteArtist,
        favoriteRadios,
        addFavoriteRadio,
        removeFavoriteRadio,
        favoriteAlbums,
        addFavoriteAlbum,
        removeFavoriteAlbum,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
