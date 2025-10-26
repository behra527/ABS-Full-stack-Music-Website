import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  songpath: {
    type: String,
    required: true
  },
  imagepath: {
    type: String,
    required: true
  }
});

const albumSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  artist: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true  
  },
  songs: [songSchema] // Array of songs within the album
});

export default mongoose.model('Album', albumSchema);
