// Imports: APIs | Utils
import { useGetAllProducts } from '@features/products/hooks/use-products';

// Imports: Components
import ProductsGrid from '@features/home/components/show-products-grid';
import Banner from '@components/banner';
import banner from '@assets/images/banner_2.jpg';

export default function Featured() {
  const { featuredProducts, isLoading } = useGetAllProducts();

  return (
    <>
      <Banner banner={banner} title="Featured Products" />
      <ProductsGrid data={featuredProducts} isLoading={isLoading} />
    </>
  );
}
