// Imports: APIs
import {
  useDecrementQuantity,
  useIncrementQuantity,
  useRemoveItem,
} from '../hooks/use-cart';

// Imports: Components
import { useItemLoading } from '@features/cart/components/use-item-loading';

export const useCartActions = () => {
  const { loadingState, handleLoading } = useItemLoading();
  const { removeItem, isLoading: isRemoving } = useRemoveItem();
  const { increaseQuantity } = useIncrementQuantity();
  const { decreaseQuantity } = useDecrementQuantity();

  const handleIncrement = async (itemId: string) => {
    await handleLoading(`${itemId}_inc`, async () => {
      await increaseQuantity(itemId);
    });
  };

  const handleDecrement = async (itemId: string) => {
    await handleLoading(`${itemId}_dec`, async () => {
      await decreaseQuantity(itemId);
    });
  };

  return {
    handleIncrement,
    handleDecrement,
    removeItem,
    loadingState,
    isRemoving,
  };
};
