import { Document, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface UserDocument extends Document {
  name: string;
  email: string;
  photo: string;
  role: 'user' | 'admin';
  phone: number;
  country: string;
  password: string;
  passwordConfirm?: string | undefined;
  passwordChangedAt: Date;
  passwordResetToken: String | undefined;
  passwordResetExpires: Date | undefined;

  // methods
  correctPassword(x: string, y: string): Promise<boolean>;
  changedPasswordAfter(x: number): boolean;
  createPasswordResetToken(): string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      minlength: [2, 'A name must have more or equal than 2 characters'],
      maxlength: [50, 'A name must have less or equal than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [8, 'A password must have more or equal than 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (this: UserDocument, value: string) {
          return validator.equals(value, this.get('password'));
        },
        message: 'Passwords do not match',
      },
    },

    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    country: String,
    phone: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Hash user's password before save
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);

  next();
});

// Methods
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min

  return resetToken;
};

const User = model<UserDocument>('User', userSchema);

export default User;
