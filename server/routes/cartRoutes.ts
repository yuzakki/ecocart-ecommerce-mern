import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

import { protect } from '../controllers/authController';
import {
  addProduct,
  decrementQuantity,
  incrementQuantity,
  removeProduct,
  showCart,
} from '../controllers/cartController';

router.use(protect);

router.get('/', showCart);

router.patch('/add-item/:productId', addProduct);
router.delete('/remove-item/:productId', removeProduct);

router.patch('/increase-quantity/:productId', incrementQuantity);
router.patch('/decrease-quantity/:productId', decrementQuantity);

export default router;
