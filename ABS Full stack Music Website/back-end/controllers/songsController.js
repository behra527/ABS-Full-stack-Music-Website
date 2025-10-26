import Song from '../models/Song.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with a unique name
  },
});

export const upload = multer({ storage: storage });

// Create a new song
export const createSong = async (req, res) => {
  try {
    const { title, artist, img } = req.body;
    const audioFile = req.file ? req.file.path : null; // Get the path of the uploaded audio file

    if (!title || !artist || !img || !audioFile) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const songData = new Song({
      title,
      artist,
      img,
      audioFile
    });

    await songData.save();
    res.status(200).json({ msg: 'Song created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a song by ID
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a song by ID
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }

    if (req.file && song.audioFile) {
      fs.unlinkSync(song.audioFile); // Delete the old audio file if a new one is uploaded
    }

    const updatedData = {
      ...req.body,
      audioFile: req.file ? req.file.path : song.audioFile, 
    };

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a song by ID
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }

    if (song.audioFile) {
      fs.unlinkSync(song.audioFile); // Delete the audio file
    }

    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the count of songs
export const getSongCount = async (req, res) => {
  try {
    const count = await Song.countDocuments();
    res.status(200).json({ totalSongs: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
