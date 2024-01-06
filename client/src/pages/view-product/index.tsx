// Imports: Libraries
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Imports: APIs | Utils
import { useGetSingleProduct } from '@features/products/hooks/use-products';

// Imports: Components
import { Button } from '@components/ui/button';
import { ProductNotFound } from '@components/not-found-ui';
import { ProductImage } from '@features/products/components/product-image';
import { ProductDetails } from '@features/products/components/product-details';

export default function ViewProduct() {
  const { product, isLoading, isError } = useGetSingleProduct();

  if (isError) return <ProductNotFound />;

  return (
    <div>
      <div className="mt-1 mb-5">
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft size={20} />
            <h2 className="ml-1 text-sm font-semibold">Back to shop</h2>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col justify-between w-full gap-10 md:flex-row">
        <ProductImage product={product} isLoading={isLoading} />
        <ProductDetails product={product} isLoading={isLoading} />
      </div>
    </div>
  );
}
