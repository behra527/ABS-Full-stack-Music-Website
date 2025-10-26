import RadioStation from "../models/RadioStation.js";
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

// Create a new radio station
export const createRadioStation = async (req, res) => {
  try {
    const { id, name, genre, description, frequency } = req.body;
    const logo = req.files?.logo ? req.files.logo[0].path : null;
    const songs = req.files?.songs ? req.files.songs.map(file => ({
      id: Date.now(),
      name: file.originalname,
      SongPath: file.path,
      imagePath: logo,
    })) : [];

    if (!id || !name || !genre || !description || !frequency || !logo || songs.length === 0) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const radioStationData = new RadioStation({
      id,
      name,
      genre,
      description,
      frequency,
      logo,
      songs,
    });

    await radioStationData.save();
    res.status(201).json({ msg: "Radio station created successfully", radioStation: radioStationData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all radio stations
export const getAllRadioStations = async (req, res) => {
  try {
    const radioStations = await RadioStation.find();
    res.status(200).json(radioStations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a radio station by ID
export const getRadioStationById = async (req, res) => {
  try {
    const radioStation = await RadioStation.findById(req.params.id);
    if (!radioStation) {
      return res.status(404).json({ msg: "Radio station not found" });
    }
    res.status(200).json(radioStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a radio station by ID
export const updateRadioStation = async (req, res) => {
  try {
    const radioStation = await RadioStation.findById(req.params.id);
    if (!radioStation) {
      return res.status(404).json({ msg: "Radio station not found" });
    }

    if (req.files && req.files.logo && radioStation.logo) {
      fs.unlinkSync(radioStation.logo); // Delete the old logo if a new one is uploaded
    }

    const updatedData = {
      ...req.body,
      logo: req.files?.logo ? req.files.logo[0].path : radioStation.logo,
      songs: req.files?.songs ? req.files.songs.map(file => ({
        id: Date.now(),
        name: file.originalname,
        SongPath: file.path,
        imagePath: req.files.logo ? req.files.logo[0].path : radioStation.logo,
      })) : radioStation.songs,
    };

    const updatedRadioStation = await RadioStation.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json({ msg: "Radio station updated successfully", radioStation: updatedRadioStation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a radio station by ID
export const deleteRadioStation = async (req, res) => {
  try {
    const radioStation = await RadioStation.findById(req.params.id);
    if (!radioStation) {
      return res.status(404).json({ msg: "Radio station not found" });
    }

    // Delete associated logo and songs
    if (radioStation.logo) {
      fs.unlinkSync(radioStation.logo);
    }
    radioStation.songs.forEach(song => {
      if (song.SongPath) {
        fs.unlinkSync(song.SongPath);
      }
    });

    await RadioStation.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Radio station deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the count of radio stations
export const getRadioStationCount = async (req, res) => {
  try {
    const count = await RadioStation.countDocuments();
    res.status(200).json({ totalRadioStations: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
