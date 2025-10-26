import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  SongPath: {
    type: String,
    required: true,
  },
  ImagePath: {
    type: String,
    required: true,
  },
});

const playlistSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: String, 
    required: true 
  },
  tracks: { 
    type: Number, 
    required: true 
  },
  songs: [songSchema] // Array of songs within the playlist
});

export default mongoose.model('Playlist', playlistSchema);
