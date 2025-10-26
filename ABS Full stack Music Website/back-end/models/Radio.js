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
  imagePath: {
    type: String,
    required: true,
  },
});

const radioStationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  genre: { 
    type: String, 
    required: true 
  },
  logo: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  frequency: { 
    type: String, 
    required: true 
  },
  songs: [songSchema] // Array of songs played on the radio station
});

export default mongoose.model('RadioStation', radioStationSchema);
