import express from 'express';
import {
  createRadioStation,
  getAllRadioStations,
  getRadioStationById,
  updateRadioStation,
  deleteRadioStation,
  getRadioStationCount,
  upload
} from '../controllers/radioStationsController.js';

const router = express.Router();

// Route to create a new radio station with file upload
router.post('/radioStations', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'songs', maxCount: 50 }
]), createRadioStation);

// Route to get all radio stations
router.get('/radioStations', getAllRadioStations);

// Route to get a specific radio station by ID
router.get('/radioStations/:id', getRadioStationById);

// Route to update a radio station by ID with file upload
router.patch('/radioStations/:id', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'songs', maxCount: 50 }
]), updateRadioStation);

// Route to delete a radio station by ID
router.delete('/radioStations/:id', deleteRadioStation);

// Route to get the count of radio stations
router.get('/radioStationCount', getRadioStationCount);

export default router;
