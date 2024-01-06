// Imports: Libraries
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Imports: APIs | Utils
import { getAllOrders, getSingleOrder } from '@api/orders/orders-api';
import { IOrder } from '@utils/typings/order';

// ------------------------
// ---- Handle fetch user's orders
// ------------------------
export function useGetOrders() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
    retry: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['order'],
    });
  }, [data, queryClient]);

  const ordersData: IOrder[] = data?.orders;

  return { ordersData, isLoading, isError, error };
}

// ------------------------
// ---- Handle fetch single order
// ------------------------
export function useGetSingleOrder() {
  const { orderID } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['order', orderID],
    queryFn: () => getSingleOrder(orderID),
    retry: false,
  });

  const order: IOrder = data?.order;

  return { order, isLoading, isError, error };
}
