// Imports: Libraries
import { FC } from 'react';

// Imports: APIs | Utils
import { useAddItem } from '@features/cart/hooks/use-cart';

// Imports: Components
import { Button } from '@components/ui/button';
import { IProductDetails } from '.';

export const ProductDetailsBody: FC<IProductDetails> = ({
  product,
  isLoading,
}) => {
  const { addItem, isLoading: isAdding } = useAddItem();

  return (
    <div className="mt-10">
      <h1 className="mb-4 text-2xl font-bold text-black">
        {!isLoading && `${product?.price}$`}
      </h1>

      <div className="flex items-center gap-2">
        {!isLoading && (
          <Button disabled={isAdding} variant="green" onClick={() => addItem()}>
            {isAdding ? 'Adding..' : 'Add to cart'}
          </Button>
        )}
      </div>
    </div>
  );
};
