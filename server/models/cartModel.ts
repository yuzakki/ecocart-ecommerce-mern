import { Schema, model, Types, Document } from 'mongoose';

export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface ITotal {
  subtotal: number;
  taxes: number;
  totalQuantity: number;
  totalItems: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: ICartItem[];
  total: ITotal;
}

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
    index: true,
  },
  quantity: {
    type: Number,
    min: [1, 'Quantity cannot be less than 1.'],
    required: [true, 'Quantity is required and must be at least 1'],
  },
});

const CartSchema = new Schema<ICart>({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true,
  },
  items: [CartItemSchema],
  total: {
    subtotal: {
      type: Number,
      default: 0,
    },
    taxes: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
});

CartSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: 'items.product',
    select: 'title price category.name images',
  }).populate({
    path: 'user',
    select: 'name email -_id',
  });

  next();
});

const Cart = model<ICart>('Cart', CartSchema);

export default Cart;
