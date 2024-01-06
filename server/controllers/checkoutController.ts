import { CookieOptions, NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import Cart from '../models/cartModel';
import Order from '../models/orderModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get the user's cart
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart || !cart.items || cart.items.length === 0) {
      return next(new AppError('Cart is empty or not found.', 404));
    }

    // 2) Create checkout session
    // await cart!.populate({
    //   path: 'items.product',
    //   select: 'title price category.name images',
    // });

    try {
      const products: Stripe.Checkout.SessionCreateParams.LineItem[] =
        cart.items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: (item.product as any).title,
              images: (item.product as any).images,
            },
            unit_amount: (item.product as any).price * 100,
          },
          quantity: item.quantity,
        }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: req.user.email,
        mode: 'payment',
        success_url: `${process.env.CLIENT_DOMAIN}/success`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/cart`,
        line_items: products,
      });

      const checkoutSessionIdCookieOption: CookieOptions = {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours max
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      };

      res.cookie(
        'checkoutSessionId',
        session.id,
        checkoutSessionIdCookieOption
      );

      // 3) Create session as response
      res.status(200).json({
        status: 'success',
        session,
      });
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while processing the request.',
      });
    }
  }
);

export const getCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const sessionId = req.cookies.checkoutSessionId;
    const cart = await Cart.findOne({ user: userId });

    if (!sessionId) {
      return next(new AppError('Session ID not found', 400));
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      return next(new AppError('Cart is empty or not found.', 404));
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        // Extract cart items and create an array for the new order
        const orderItems = cart.items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: (item.product as any).price,
        }));

        // Calculate total amount based on cart subtotal ONLY
        const totalAmount = cart.total.subtotal;

        // Create new order
        const newOrder = await Order.create({
          user: userId,
          items: orderItems,
          totalAmount,
          status: 'processing',
          paymentDetails: {
            paymentMethod: 'stripe',
          },
        });

        await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });

        // although it's not important
        res.clearCookie('checkoutSessionId', {
          sameSite: 'none',
          secure: true,
        });

        res.status(200).json({
          status: 'success',
          message: 'Order successfully created.',
          order: newOrder,
        });
      } else {
        next(new AppError('Payment is pending or not completed yet.', 402));
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while retrieving the checkout session.',
      });
    }
  }
);
