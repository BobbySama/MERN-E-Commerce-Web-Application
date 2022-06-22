import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
// router.route('/').post(registerUser).get(protect, getUsers);

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin, deleteUser);

export default router;
