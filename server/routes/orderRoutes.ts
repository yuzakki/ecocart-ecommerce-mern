import express from 'express';
const router = express.Router();

import { protect } from '../controllers/authController';
import { getOrders, getSingleOrder } from '../controllers/orderController';

router.use(protect);

router.get('/', getOrders);
router.get('/:orderID', getSingleOrder);

export default router;
