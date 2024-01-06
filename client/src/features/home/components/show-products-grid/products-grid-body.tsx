// Imports: APIs | Utils
import { IProduct } from '@utils/typings/product';

// Imports: Components
import { Skeleton } from '@components/ui/skeleton';
import { ProductsGridItem } from './products-grid-item';

export function ProductsGridBody({
  data,
  isLoading,
}: {
  data: IProduct[];
  isLoading: boolean;
}) {
  return (
    <div className="grid items-start grid-cols-1 mt-6 md:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
      {isLoading
        ? Array(8)
            .fill(null)
            .map((_, i) => <Skeleton className="w-full h-52" key={i} />)
        : data?.map((product) => (
            <ProductsGridItem product={product} key={product?._id} />
          ))}
    </div>
  );
}
