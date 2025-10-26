// models/Song.js
import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  artist: { 
    type: String, 
    required: true 
  },
 
  img: { 
    type: String, 
    required: true 
  },
  audioFile: { // Field for storing the audio file path
    type: String,
    required: true
  }
});

export default mongoose.model('Song', songSchema);
