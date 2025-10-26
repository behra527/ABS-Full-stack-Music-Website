import express from 'express';
import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumCount,
  upload
} from '../controllers/albumsController.js';

const router = express.Router();

// Routes for creating an album with file uploads
router.post('/createAlbum', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'songs', maxCount: 10 }
]), createAlbum);

router.get('/getAllAlbums', getAllAlbums);
router.get('/getAlbumById/:id', getAlbumById);
router.patch('/updateAlbum/:id', updateAlbum); 
router.delete('/deleteAlbum/:id', deleteAlbum);
router.get('/albumCount', getAlbumCount);

export default router;
