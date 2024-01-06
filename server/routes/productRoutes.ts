import express from 'express';
const router = express.Router();

import { getAllProducts, getProduct } from '../controllers/productController';

router.route('/').get(getAllProducts);

router.route('/:id').get(getProduct)

export default router;
