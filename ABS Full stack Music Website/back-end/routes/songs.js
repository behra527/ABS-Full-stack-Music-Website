import express from 'express';
import { 
    createSong, 
    getAllSongs, 
    getSongById, 
    updateSong, 
    deleteSong, 
    getSongCount,
    upload
} from '../controllers/songsController.js';

const router = express.Router();

// Route to create a new song
router.post('/songs', upload.single('audioFile'), createSong);

// Route to get all songs
router.get('/songs', getAllSongs);

// Route to get a specific song by ID
router.get('/songs/:id', getSongById);

// Route to update a song by ID
router.put('/songs/:id', upload.single('audioFile'), updateSong);

// Route to delete a song by ID
router.delete('/songs/:id', deleteSong);

// Route to get the count of songs
router.get('/songCount', getSongCount);

export default router;
