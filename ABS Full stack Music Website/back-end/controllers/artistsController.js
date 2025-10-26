import Artist from "../models/Artist.js";
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

// Create a new artist
export const createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.files?.image ? req.files.image[0].path : null;
    const songs = req.files?.songs ? req.files.songs.map(file => ({
      name: file.originalname,
      songpath: file.path,
      imagepath: image,
    })) : [];

    if (!name || !image || songs.length === 0) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const artistData = new Artist({
      name,
      image,
      songs,
    });

    await artistData.save();
    res.status(201).json({ msg: "Artist created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all artists
export const getAllArtists = async (req, res) => {
  try {
    const artistData = await Artist.find();
    res.status(200).json(artistData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an artist by ID
export const getArtistById = async (req, res) => {
  try {
    const id = req.params.id;
    const artistExist = await Artist.findById(id);
    if (!artistExist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    res.status(200).json(artistExist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an artist by ID
export const updateArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const artistExist = await Artist.findById(id);
    if (!artistExist) {
      return res.status(404).json({ msg: "Artist not found" });
    }

    const updatedArtist = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Artist updated successfully", updatedArtist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an artist by ID
export const deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const artistExist = await Artist.findById(id);
    if (!artistExist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    await Artist.findByIdAndDelete(id);
    res.status(200).json({ msg: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get artist count
export const getArtistCount = async (req, res) => {
  try {
    const count = await Artist.countDocuments();
    res.status(200).json({ totalArtists: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
