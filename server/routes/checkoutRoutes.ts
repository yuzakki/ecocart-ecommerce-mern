import express from 'express';
const router = express.Router();

import { protect } from '../controllers/authController';
import {
  createCheckoutSession,
  getCheckoutSession,
} from '../controllers/checkoutController';

router.use(protect);

router.post('/create-checkout-session', createCheckoutSession);

router.get('/retrieve-checkout-session', getCheckoutSession);

export default router;
