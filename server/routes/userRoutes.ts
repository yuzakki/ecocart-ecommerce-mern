import express from 'express';

import { protect } from '../controllers/authController';
import {
  resizeUserPhoto,
  updateMe,
  updatePassword,
  uploadUserPhoto,
} from '../controllers/userController';

const router = express.Router();

router.use(protect);

router.patch('/update-me', uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/update-my-password', updatePassword);

export default router;
