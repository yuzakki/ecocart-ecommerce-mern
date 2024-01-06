import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
import app from './app';

declare global {
  namespace Express {
    interface Request {
      context: string;
      user: import('./models/authModel').UserDocument;
    }
  }
}

// 1) DATABASE CONFIGURATIONS
const DB = process.env.DATABASE_URL!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!
);

mongoose
  .connect(DB)
  .then(() => console.log('Connected to database!'))
  .catch((err) => console.log(err));

// 2) SERVER
const port = +process.env.PORT!;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
