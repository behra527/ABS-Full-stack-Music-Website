import express from 'express';
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getPlaylistCount,
  upload
} from '../controllers/playlistsController.js';

const router = express.Router();

// Route to create a new playlist with file upload
router.post('/playlists', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'songs', maxCount: 50 }
]), createPlaylist);

// Route to get all playlists
router.get('/playlists', getAllPlaylists);

// Route to get a specific playlist by ID
router.get('/playlists/:id', getPlaylistById);

// Route to update a playlist by ID with file upload
router.patch('/playlists/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'songs', maxCount: 50 }
]), updatePlaylist);

// Route to delete a playlist by ID
router.delete('/playlists/:id', deletePlaylist);

// Route to get the count of playlists
router.get('/playlistCount', getPlaylistCount);

export default router;
