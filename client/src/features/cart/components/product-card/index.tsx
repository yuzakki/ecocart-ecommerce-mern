// Imports: Components
import { ICartItem } from '@utils/typings/cart';
import { useCartActions } from '../use-cart-actions';
import { ProductImage } from './product-image';
import { ProductQuantity } from './product-quantity';
import { RemoveProduct } from './remove-product';

export default function ProductCard({
  product: { _id, images, title, price },
  quantity,
}: ICartItem) {
  const {
    handleIncrement,
    handleDecrement,
    removeItem,
    loadingState,
    isRemoving,
  } = useCartActions();

  return (
    <div className="flex flex-col items-start justify-between flex-1 gap-4 p-2 border rounded-md sm:items-center sm:flex-row">
      <ProductImage title={title} price={price} image={images?.[0]} />

      <div className='flex justify-between w-full gap-12 mt-2 sm:w-fit '>
        <ProductQuantity
          _id={_id}
          quantity={quantity}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          loadingState={loadingState}
        />

        <RemoveProduct
          _id={_id}
          removeItem={removeItem}
          isLoading={isRemoving}
        />
      </div>
    </div>
  );
}
