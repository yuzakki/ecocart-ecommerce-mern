import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import NodeCache from 'node-cache';

import Product from '../models/productModel';
import Cart, { ICart } from '../models/cartModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const cache = new NodeCache();

export const showCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user id from request
    const userId = req.user._id;

    let cart: ICart | undefined | null;
    if (cache.has('cart')) {
      cart = cache.get('cart');
    } else {
      cart = await Cart.findOne({ user: userId });
      cache.set('cart', cart?.toObject());
    }

    if (!cart || !cart?.items.length) {
      return next(new AppError('There are no items in your cart', 404));
    }

    // 3) Send success response
    res.status(200).json({
      status: 'success',
      message: 'Your cart',
      cart,
    });
  }
);

export const incrementQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.productId;

    const incrementOperation = (cart: ICart, index: number) => {
      cart.items[index].quantity += 1;
    };

    await updateCartQuantity(
      req,
      res,
      next,
      productId,
      incrementOperation,
      'increment'
    );
  }
);

export const decrementQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.productId;

    const decrementOperation = (
      cart: ICart,
      index: number,
      productId: string
    ) => {
      if (cart.items[index].quantity === 1) {
        cart.items = cart.items.filter(
          (item) => !item.product.equals(productId)
        );
      } else {
        cart.items[index].quantity -= 1;
      }
    };

    await updateCartQuantity(
      req,
      res,
      next,
      productId,
      decrementOperation,
      'decrement'
    );
  }
);

export const addProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId });
      cart.populate({
        path: 'items.product',
        select: 'title price category.name images',
      });
    }

    const updatedCart = await updateCart(cart, productId, true, next);

    res.status(201).json({
      status: 'success',
      message: 'Product added to cart',
      cart: updatedCart,
    });
  }
);

export const removeProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart || !cart?.items.length) {
      return next(new AppError('There are no items in your cart', 404));
    }

    const updatedCart = await updateCart(cart, productId, false, next);

    res.status(200).json({
      status: 'success',
      message: 'Item successfully removed',
      cart: updatedCart,
    });
  }
);

// ########################
// ##### UTILS #####
// ########################

async function getProductPrice(productId: Types.ObjectId): Promise<number> {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product.price;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return 0;
  }
}

// Calculate totals based on cart items
export async function calculateTotals(cart: ICart): Promise<void> {
  cart.total.totalItems = cart.items.length;
  cart.total.subtotal = 0;

  // Loop through cart items and calculate subtotal by fetching prices from the database
  for (const item of cart.items) {
    const productPrice = await getProductPrice(item.product);
    cart.total.subtotal += item.quantity * productPrice;
  }

  // Update taxes and totalQuantity
  const taxRate = 0.1;
  cart.total.taxes = +(cart.total.subtotal * taxRate).toFixed(2);

  cart.total.totalQuantity = cart.items.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
}

// ########################

type UpdateOperationFunction = (
  cart: ICart,
  index: number,
  productId: string
) => void | Promise<void>;

const updateCartQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction,
  productId: string,
  updateOperation: UpdateOperationFunction,
  operationType: 'increment' | 'decrement'
) => {
  const userId = req.user._id;

  const cart: ICart | null = await Cart.findOne({ user: userId });
  if (!cart || !cart.items.length) {
    return next(new AppError('There are no items in your cart', 404));
  }

  const existingItemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (existingItemIndex !== -1) {
    await updateOperation(cart, existingItemIndex, productId);
  } else {
    return next(new AppError('The product is not in your cart', 404));
  }

  await calculateTotals(cart);
  await cart.save();

  cache.set('cart', cart.toObject());

  res.status(200).json({
    status: 'success',
    message:
      operationType === 'increment'
        ? 'Product quantity incremented'
        : 'Product quantity decremented',
    cart,
  });
};

// ########################

const updateCart = async (
  cart: ICart,
  productId: string,
  adding: boolean,
  next: NextFunction
): Promise<ICart | void> => {
  const existingItemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (adding) {
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      const newProduct = new Types.ObjectId(productId);
      cart.items.push({ product: newProduct, quantity: 1 });
    }
  } else {
    if (existingItemIndex === -1) {
      return next(new AppError('Product not found in your cart', 404));
    }
    cart.items = cart.items.filter((item) => !item.product.equals(productId));
  }

  await calculateTotals(cart);
  await cart.save();

  const cachedCart = await cart.populate({
    path: 'items.product',
    select: 'title price category.name images',
  });
  cache.set('cart', cachedCart.toObject());

  return cart;
};
