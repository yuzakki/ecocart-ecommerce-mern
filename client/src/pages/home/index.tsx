// Imports: APIs | Utils
import { useGetAllProducts } from '@features/products/hooks/use-products';

// Imports: Components
import { HomeBanner } from '@features/home/components/home-banner';
import ProductsGrid from '@features/home/components/show-products-grid';

export default function Home() {
  const { featuredProducts, recommendedProducts, isLoading } =
    useGetAllProducts();

  return (
    <>
      <HomeBanner />

      <ProductsGrid
        title={'Featured'}
        data={featuredProducts}
        isLoading={isLoading}
      />

      <ProductsGrid
        title={'Recommended'}
        data={recommendedProducts}
        isLoading={isLoading}
      />
    </>
  );
}
