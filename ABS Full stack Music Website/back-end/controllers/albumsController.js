import Album from "../models/Album.js";
import multer from "multer";
import path from "path";

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

// Create a new album
export const createAlbum = async (req, res) => {
  try {
    const { name, artist } = req.body;
    const image = req.files?.image ? req.files.image[0].path : null;
    const songs = req.files?.songs ? req.files.songs.map(file => ({ songpath: file.path })) : [];

    if (!name || !artist || !image || songs.length === 0) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const albumData = new Album({
      name,
      artist,
      image,
      songs,
    });

    await albumData.save();
    res.status(201).json({ msg: "Album created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all albums
export const getAllAlbums = async (req, res) => {
  try {
    const albumData = await Album.find();
    res.status(200).json(albumData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an album by ID
export const getAlbumById = async (req, res) => {
  try {
    const id = req.params.id;
    const albumExist = await Album.findById(id);
    if (!albumExist) {
      return res.status(404).json({ msg: "Album not found" });
    }
    res.status(200).json(albumExist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an album by ID
export const updateAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const albumExist = await Album.findById(id);
    if (!albumExist) {
      return res.status(404).json({ msg: "Album not found" });
    }

    const updatedAlbum = await Album.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Album updated successfully", updatedAlbum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an album by ID
export const deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const albumExist = await Album.findById(id);
    if (!albumExist) {
      return res.status(404).json({ msg: "Album not found" });
    }
    await Album.findByIdAndDelete(id);
    res.status(200).json({ msg: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get album count
export const getAlbumCount = async (req, res) => {
  try {
    const count = await Album.countDocuments();
    res.status(200).json({ totalAlbums: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
