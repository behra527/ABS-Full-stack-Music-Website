import express from 'express';
import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  getArtistCount,
  upload
} from '../controllers/artistsController.js';

const router = express.Router();

// Routes for creating an artist with file uploads
router.post('/createArtist', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'songs', maxCount: 10 }
]), createArtist);

router.get('/getAllArtists', getAllArtists);
router.get('/getArtistById/:id', getArtistById);
router.patch('/updateArtist/:id', updateArtist); 
router.delete('/deleteArtist/:id', deleteArtist);
router.get('/getArtistCount', getArtistCount);

export default router;
