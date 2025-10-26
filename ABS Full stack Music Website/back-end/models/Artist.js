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
  songpath: {
    type: String,
    required: true,
  },
  imagepath: {
    type: String,
    required: true,
  },
});

const artistSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  songs: [songSchema],
});

export default mongoose.model('Artist', artistSchema);
