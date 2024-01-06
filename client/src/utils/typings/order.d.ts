import { IProduct } from './product';

interface IOrderItem {
  _id: string;
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  // user: any;
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paid: boolean;
  paymentDetails: {
    paymentMethod: string;
  };
  createdAt: Date;
}
