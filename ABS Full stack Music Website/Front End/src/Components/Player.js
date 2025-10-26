import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';
import { useMusic } from '../contexts/MusicContext';

function Player() {
  const { currentTrack, isPlaying, playTrack, pauseTrack, playNextTrack, playPreviousTrack } = useMusic();
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1); // Volume state
  const [currentTime, setCurrentTime] = useState(0); // Current time state
  const [duration, setDuration] = useState(0); // Duration state

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Set initial volume
      if (isPlaying) {
        if (!audioRef.current.paused && audioRef.current.src !== currentTrack?.url) {
          audioRef.current.pause();
        }
        audioRef.current.src = currentTrack?.url || "";
        audioRef.current.play().catch((error) => {
          console.error("Play request failed: ", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]); // Notice volume is removed from dependencies

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      if (currentTrack) {
        playTrack(currentTrack);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Update volume directly without triggering playback logic
    }
  };

  const handleProgressBarChange = (event) => {
    const newTime = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {currentTrack && (
          <>
            <img src={currentTrack.image} alt="Current Track" className="w-12 h-12 mr-4" />
            <div>
              <h3 className="text-lg">{currentTrack.name}</h3>
              <p>{currentTrack.artist}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-2">
          <button onClick={playPreviousTrack} className="mx-2">
            <FaStepBackward size={20} />
          </button>
          <button onClick={handlePlayPause} className="mx-2">
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button onClick={playNextTrack} className="mx-2">
            <FaStepForward size={20} />
          </button>
        </div>
        <div className="flex items-center w-full">
          <span className="text-sm mr-2">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="w-full"
            value={currentTime}
            max={duration}
            onChange={handleProgressBarChange}
          />
          <span className="text-sm ml-2">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center">
        <FaVolumeUp className="mr-2" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange} 
          className="mr-4" 
        />
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata} // To get the duration of the song
          onEnded={() => playNextTrack()}
        />
      </div>
    </div>
  );
}

export default Player;
