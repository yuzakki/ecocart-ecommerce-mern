// Imports: Libraries
import { Link } from 'react-router-dom';

// Imports: APIs | Utils
import { IOrder } from '@utils/typings/order';

// Imports: Components
import { Button } from '@components/ui/button';
import { OrderDetails } from './order-details';
import { OrderImage } from './order-image';
import { OrderStatus } from './order-status';

interface IOrderItem {
  order: IOrder;
}

export default function OrderItem({ order }: IOrderItem) {
  const { _id, items, createdAt, status } = order || {};

  return (
    <div
      key={_id}
      className="flex flex-col justify-between gap-4 p-4 border rounded-sm md:flex-row md:gap-2"
    >
      <div className="flex gap-3">
        <OrderImage imageUrl={items[0]?.product.images[0]} />
        <OrderDetails orderId={_id} createdAt={createdAt} />
      </div>

      <OrderStatus status={status} />

      <Button className="my-auto" asChild>
        <Link to={`/account/order/${_id}`}>View Order</Link>
      </Button>
    </div>
  );
}
