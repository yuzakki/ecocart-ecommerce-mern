import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import hpp from 'hpp';

import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import cartRouter from './routes/cartRoutes';
import checkoutRouter from './routes/checkoutRoutes';
import orderRouter from './routes/orderRoutes';

import globalErrorHandler from './controllers/errorController';

const app = express();

// 1) GLOBAL MIDDLEWARES

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Implement CORS
const allowedOrigin = process.env.CLIENT_DOMAIN;
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));
app.use('*/images', express.static('public/images'));

// Set security HTTP headers
app.use(helmet());

// Development loggin
if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300,
  message: 'Too many requests from this IP, please try again in 15 minutes!',
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Compresses response data to optimize transmission for static assets
app.use(compression());

app.set('trust proxy', 1); // trust first proxy

// 2) ROUTES
// auth routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// products routes
app.use('/api/products', productRouter);

// cart routes
app.use('/api/cart', cartRouter);

// order routes
app.use('/api/orders', orderRouter);

// checkout routes
app.use('/api/checkout', checkoutRouter);

app.use(globalErrorHandler);

export default app;
