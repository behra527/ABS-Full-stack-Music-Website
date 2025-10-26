import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import albumRoutes from './routes/albums.js';
import artistRoutes from './routes/artists.js';
import songRoutes from './routes/songs.js';
import userRoutes from './routes/users.js';
//import playlistRoute from './routes/playlist.js';
//import radioRoute from './routes/radio.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);
app.use('/users', userRoutes);
//app.use('/playlist',playlistRoute);
//app.use('/radio', radioRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Handle root request (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export the app for use in server.js
export default app;
