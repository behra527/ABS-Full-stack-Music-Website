import Playlist from "../models/Playlist.js";
import multer from "multer";
import path from "path";
import fs from "fs";

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

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, owner, tracks } = req.body;
    const image = req.files?.image ? req.files.image[0].path : null;
    const songs = req.files?.songs ? req.files.songs.map(file => ({
      id: Date.now(),
      name: file.originalname,
      SongPath: file.path,
      ImagePath: image,
    })) : [];

    if (!name || !description || !owner || !tracks || !image || songs.length === 0) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const playlistData = new Playlist({
      name,
      description,
      owner,
      tracks,
      image,
      songs,
    });

    await playlistData.save();
    res.status(201).json({ msg: "Playlist created successfully", playlist: playlistData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a playlist by ID
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a playlist by ID
export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    if (req.files && req.files.image && playlist.image) {
      fs.unlinkSync(playlist.image); // Delete the old image if a new one is uploaded
    }

    const updatedData = {
      ...req.body,
      image: req.files?.image ? req.files.image[0].path : playlist.image,
      songs: req.files?.songs ? req.files.songs.map(file => ({
        id: Date.now(),
        name: file.originalname,
        SongPath: file.path,
        ImagePath: req.files.image ? req.files.image[0].path : playlist.image,
      })) : playlist.songs,
    };

    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json({ msg: "Playlist updated successfully", playlist: updatedPlaylist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a playlist by ID
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    // Delete associated image and songs
    if (playlist.image) {
      fs.unlinkSync(playlist.image);
    }
    playlist.songs.forEach(song => {
      if (song.SongPath) {
        fs.unlinkSync(song.SongPath);
      }
    });

    await Playlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the count of playlists
export const getPlaylistCount = async (req, res) => {
  try {
    const count = await Playlist.countDocuments();
    res.status(200).json({ totalPlaylists: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
