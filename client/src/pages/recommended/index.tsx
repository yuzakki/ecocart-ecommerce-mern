// Imports: APIs | Utils
import { useGetAllProducts } from '@features/products/hooks/use-products';

// Imports: Components
import ProductsGrid from '@features/home/components/show-products-grid';
import Banner from '@components/banner';
import banner from '@assets/images/banner_3.jpg';

export default function Recommended() {
  const { recommendedProducts, isLoading } = useGetAllProducts();

  return (
    <>
      <Banner banner={banner} title="Recommended Product" />
      <ProductsGrid data={recommendedProducts} isLoading={isLoading} />
    </>
  );
}
