import { IProduct } from './product';

export interface ICartItem {
  _id: string;
  product: IProduct;
  quantity: number;
}

interface ITotal {
  subtotal: number;
  taxes: number;
  totalQuantity: number;
  totalItems: number;
}

export interface ICart {
  // user: any;
  items: CartItem[];
  total: ITotal;
}
