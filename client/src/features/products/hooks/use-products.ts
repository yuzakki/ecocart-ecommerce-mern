// Imports: Libraries
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Imports: APIs | Utils
import { getAllProducts, getSingleProduct } from '@api/products/products-api';
import { IProduct } from '@utils/typings/product';

// ------------------------
// ---- Handle fetch all products
// ------------------------
export function useGetAllProducts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    retry: false,
  });

  const products: IProduct[] = data?.data?.products;

  // Featured products
  const featuredProducts = products?.filter(
    (product: IProduct) => product.featured
  );

  // Recommended products
  const recommendedProducts = products?.filter(
    (product: IProduct) => product.recommended
  );

  return {
    products,
    featuredProducts,
    recommendedProducts,
    isLoading,
    isError
  };
}

// ------------------------
// ---- Handle fetch single product
// ------------------------
export function useGetSingleProduct() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getSingleProduct(productId),
    retry: false,
    // staleTime: 0,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['product'],
    });
  }, [data, queryClient]);

  const product: IProduct = data?.data.product;

  return { product, isLoading, isError };
}
