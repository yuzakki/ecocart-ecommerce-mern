import ProductCard from './product-card';
import { ICartItem } from '@utils/typings/cart';

interface IProductDetails {
  items: ICartItem[];
}

export const ProductDetails = ({ items }: IProductDetails) => {
  return (
    <div className="min-h-20 basis-[65%] space-y-4">
      {items?.map((item: ICartItem) => (
        <ProductCard key={item._id} {...item} />
      ))}
    </div>
  );
};
