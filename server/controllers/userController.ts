import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';

import User from '../models/authModel';
import catchAsync from '../utils/catchAsync';
import createSendToken from '../utils/createSendToken';
import AppError from '../utils/appError';

// const multerStorage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, 'public/images/users');
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    const error = new AppError(
      'Not an image! Please upload only images',
      400
    ) as any;
    cb(error, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/users/${req.file.filename}`);

    next();
  }
);

const filterObj = (
  obj: Record<string, any>,
  allowedFields: string[]
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const allowedFields = ['name', 'email', 'phone', 'country', 'photo'];
    const filteredBody = filterObj(req.body, allowedFields);

    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user from collection
    const user = await User.findById(req.user._id).select('+password');

    // 2) Check if POSTed password is correct
    if (
      user &&
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError('Your current password is wrong', 401));
    }

    // 3) Check if the new password isn't the same as the old one
    if (
      user &&
      (await user.correctPassword(req.body.password, user.password))
    ) {
      return next(
        new AppError(
          'The new password cannot be the same as the old password',
          400
        )
      );
    }

    // 4) If so, update password
    if (user) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      await user.save();
      // 4) Log user in, send JWT
      createSendToken(user, 200, res);
    }
  }
);
