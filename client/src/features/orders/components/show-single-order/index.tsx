// Imports: APIs | Utils
import { useGetSingleOrder } from '@features/orders/hooks/use-orders';
import { IOrderItem } from '@utils/typings/order';

// Imports: Components
import { Separator } from '@components/ui/separator';
import { Loader } from '../common/loaders-ui';
import { OrderItemDetails } from './order-item-details';

export default function ShowSingleOrder() {
  const { order, isLoading, isError, error } = useGetSingleOrder();

  if (isLoading) return <Loader />;

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  return (
    <div>
      <div className="pb-6 space-y-1 border-b mb-7">
        <h2 className="text-lg font-bold">
          Order ID: <span className="text-xs md:text-lg">{order?._id}</span>
        </h2>
      </div>

      <section className="mt-3 space-y-3">
        {order.items.map((item: IOrderItem) => (
          <OrderItemDetails item={item} key={item._id} />
        ))}
      </section>

      <Separator orientation="horizontal" className="my-5" />

      <div>
        <h1 className="float-right text-lg font-semibold text-green-500">
          Total Amount: {order.totalAmount}$
        </h1>
      </div>
    </div>
  );
}
