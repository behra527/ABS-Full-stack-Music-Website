import express from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getUserCount,
  upload
} from '../controllers/usersController.js';

const router = express.Router();

// Route to create a new user with file upload
router.post('/createUser', upload.single('picture'), createUser);

// Route to get all users
router.get('/getAllUsers', getAllUsers);

// Route to get a specific user by ID
router.get('/getOneUser/:id', getOneUser);

// Route to update a user by ID with file upload
router.patch('/updateUser/:id', upload.single('picture'), updateUser);

// Route to delete a user by ID
router.delete('/deleteUser/:id', deleteUser);

// Route to get the count of users
router.get('/getUserCount', getUserCount);

export default router;
