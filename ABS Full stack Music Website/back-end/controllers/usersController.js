import User from "../models/User.js";
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

// Create a new user
export const createUser = async (req, res) => {
  try {
    if (!req.body || !req.file) {
      return res.status(400).json({ msg: "Incomplete user data provided" });
    }

    const userData = new User({
      ...req.body,
      picture: req.file.path
    });

    await userData.save();
    res.status(201).json({ msg: "User created successfully", user: userData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userExist);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.file && userExist.picture) {
      fs.unlinkSync(userExist.picture); // Delete the old picture if a new one is uploaded
    }

    const updatedData = {
      ...req.body,
      picture: req.file ? req.file.path : userExist.picture, 
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ msg: "User updated successfully", user: updatedUser });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (userExist.picture) {
      fs.unlinkSync(userExist.picture); // Delete the picture
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user count
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments(); 
    res.status(200).json({ totalUsers: count }); 

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
