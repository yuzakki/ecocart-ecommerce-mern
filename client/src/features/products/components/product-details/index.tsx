// Imports: Libraries
import { FC } from 'react';

// Imports: APIs | Utils
import { IProduct } from '@utils/typings/product';

// Imports: Components
import { ProductDetailsBody } from './product-details-body';
import { ProductDetailsHeader } from './product-details-header';

export interface IProductDetails {
  product: IProduct;
  isLoading: boolean;
}

export const ProductDetails: FC<IProductDetails> = ({ product, isLoading }) => {
  return (
    <section className="w-full h-full px-5 py-8 min-h-32 basis-1/2">
      <ProductDetailsHeader product={product} isLoading={isLoading} />
      <ProductDetailsBody product={product} isLoading={isLoading} />
    </section>
  );
};
