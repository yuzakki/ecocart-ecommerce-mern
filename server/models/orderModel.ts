import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface OrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface Order extends Document {
  user: Schema.Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paid: boolean;
  paymentDetails: {
    paymentMethod: string;
  };
  createdAt: Date;
}

const orderSchema = new Schema<Order>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value > 0,
          message: 'Qunatity must be greater than 0',
        },
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value >= 0,
          message: 'Price must be greater than or equal to 0',
        },
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
  paymentDetails: {
    paymentMethod: String,
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

orderSchema.pre(/^find/, function (this: any, next) {
  this.populate('user', 'name email').populate(
    'items.product',
    'title price category.name images'
  );

  next();
});

const Order = model<Order>('Order', orderSchema);

export default Order;
