import express from 'express';
import {
  forgotPassword,
  isAuthenticated,
  login,
  logout,
  resetPassword,
  signup,
} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/isAuthenticated', isAuthenticated);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

export default router;
