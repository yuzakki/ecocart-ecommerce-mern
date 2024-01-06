import { NextFunction, Request, Response } from 'express';

import Order from '../models/orderModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId });

    if (!orders || orders.length === 0) {
      return next(
        new AppError("It looks like you haven't placed any orders.", 404)
      );
    }

    res.json({
      status: 'success',
      orders,
    });
  }
);

export const getSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderID = req.params.orderID;
    const userId = req.user._id;
    const order = await Order.findOne({ user: userId, _id: orderID });

    if (!order) {
      return next(
        new AppError("It looks like you haven't placed any orders.", 404)
      );
    }

    res.json({
      status: 'success',
      order,
    });
  }
);
