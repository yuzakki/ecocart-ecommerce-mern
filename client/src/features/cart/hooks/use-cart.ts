// Imports: Libraries
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Imports: APIs | Utils
import { ICart, ICartItem, ITotal } from '@utils/typings/cart';
import {
  getCart,
  addItem as addItemApi,
  removeItem as removeItemApi,
  increaseQuantity as increaseQuantityApi,
  decreaseQuantity as decreaseQuantityApi,
} from '@api/cart/cart-api';

// ------------------------
// ---- Fetch user's cart data
// ------------------------
export function useGetCart() {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    retry: false,
  });

  const cart: ICart = data?.cart;
  const items: ICartItem[] = cart?.items;
  const totals: ITotal = cart?.total;

  return { cart, items, totals, isLoading, isSuccess, isError, error };
}

// ------------------------
// ---- Handle add new item to cart
// ------------------------
export function useAddItem() {
  const queryClient = useQueryClient();
  const { productId } = useParams();

  const { mutateAsync: addItem, isPending: isLoading } = useMutation({
    mutationFn: () => addItemApi(productId),

    onSuccess: (data) => {
      toast.success(String(data?.message));
      // queryClient.invalidateQueries({
      //   queryKey: ['cart'],
      // });
      queryClient.setQueryData(['cart'], data);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error: any) => {
      toast.error(String(error.message));
    },
  });

  return { addItem, isLoading };
}

// ------------------------
// ---- Handle remove item from cart
// ------------------------
export function useRemoveItem() {
  const queryClient = useQueryClient();

  const { mutateAsync: removeItem, isPending: isLoading } = useMutation({
    mutationFn: removeItemApi,

    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['cart'],
      // });
      queryClient.setQueryData(['cart'], data);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error: any) => {
      toast.error(String(error.message));
    },
  });

  return { removeItem, isLoading };
}

// ------------------------
// ---- Handle increment quantity of items
// ------------------------
export function useIncrementQuantity() {
  const queryClient = useQueryClient();

  const { mutateAsync: increaseQuantity, isPending: isLoading } = useMutation({
    mutationFn: increaseQuantityApi,

    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['cart'],
      // });
      queryClient.setQueryData(['cart'], data);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error: any) => {
      toast.error(String(error.message));
    },
  });

  return { increaseQuantity, isLoading };
}

// ------------------------
// ---- Handle decrement quantity of items
// ------------------------
export function useDecrementQuantity() {
  const queryClient = useQueryClient();

  const { mutateAsync: decreaseQuantity, isPending: isLoading } = useMutation({
    mutationFn: decreaseQuantityApi,

    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['cart'],
      // });
      queryClient.setQueryData(['cart'], data);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error: any) => {
      toast.error(String(error.message));
    },
  });

  return { decreaseQuantity, isLoading };
}
