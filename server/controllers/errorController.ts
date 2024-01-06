import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

// Handles CastError from the database
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handles Duplicate Fields Error from the database
const handleDuplicateFieldsDB = (err: any) => {
  const keys = Object.keys(err.keyValue);
  const value = err.keyValue[keys[0]];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handles Validation Error from the database
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Sends error details in the development environment
const sendErrorDev = (error: any, res: Response): void => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

// Sends error details in the production environment
const sendErrorProd = (error: any, res: Response) => {
  // A) Operational, trusted error: send message to client
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', error);
  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Oops! Something went wrong.',
  });
};

// Error handler middleware
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Selects appropriate error handler based on error type
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // Sends the error in the production environment
    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
