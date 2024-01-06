// Imports: Libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

// Imports: APIs | Utils
import {
  createCheckoutSession as createCheckoutSessionApi,
  getCheckoutSession as getCheckoutSession,
} from '@api/checkout/checkout-api';
import { IOrder } from '@utils/typings/order';

// ------------------------
// ---- Handle create new checkout session
// ------------------------
export function useCreateCheckoutSession() {
  const { mutateAsync: createCheckoutSession, isPending: isLoading } =
    useMutation({
      mutationFn: createCheckoutSessionApi,

      onSuccess: (data) => {
        toast.success('Redirecting...');
        window.location.replace(data.session.url);
      },

      onError: (error: any) => {
        toast.error(String(error.message));
      },
    });

  return { createCheckoutSession, isLoading };
}

// ------------------------
// ---- Handle fetch current checkout session data
// ------------------------
export function useGetCkeckoutSession() {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['checkout'],
    queryFn: getCheckoutSession,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) toast.success(String(data?.message), { duration: 2500 });
  }, [isSuccess]);

  const order: IOrder = data?.order;

  return { order, isLoading, isSuccess, isError, error };
}
