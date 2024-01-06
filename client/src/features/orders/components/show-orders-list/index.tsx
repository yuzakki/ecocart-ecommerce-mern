// Imports: APIs | Utils
import { useGetOrders } from '@features/orders/hooks/use-orders';

// Imports: Components
import OrderItem from './order-item';
import { Loader } from '../common/loaders-ui';
import { NoOrdersItemsError } from '../common/errors-ui';

export default function ShowOrdersList() {
  const { ordersData, isLoading, isError, error } = useGetOrders();

  if (isLoading) return <Loader />;

  if (isError) return <NoOrdersItemsError message={error?.message} />;

  return (
    <div>
      <div className="pb-6 space-y-1 border-b mb-7">
        <h2 className="text-lg font-bold">Orders History</h2>
        <p>Your orders history</p>
      </div>

      <h1 className="text-base">{ordersData.length} orders:</h1>

      <section className="mt-3 space-y-3">
        {ordersData.map((order: any) => (
          <OrderItem order={order} key={order._id} />
        ))}
      </section>
    </div>
  );
}
