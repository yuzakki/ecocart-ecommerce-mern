// Imports: APIs
import { useGetCart } from '@features/cart/hooks/use-cart';

// Imports: Components
import { ProceedCard } from '@features/cart/components/proceed-card';
import { ProductDetails } from '@features/cart/components/product-details';
import { ThreeDotsLoader } from '@components/loaders/global-loader';
import { NoItemsError } from '@features/cart/components/common/errors-ui';

export default function Cart() {
  const { isLoading, items, totals, isError, error } = useGetCart();

  if (isLoading) return <ThreeDotsLoader />;

  if (isError) return <NoItemsError message={error?.message} />;

  return (
    <div className="flex flex-col justify-between gap-10 mt-10 lg:flex-row">
      <ProductDetails items={items} />
      <ProceedCard totals={totals} />
    </div>
  );
}
