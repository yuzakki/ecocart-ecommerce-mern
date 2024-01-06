import { Link } from 'react-router-dom';
import { formateDate } from '@utils/helpers';

interface IOrderDetails {
  orderId: string;
  createdAt: Date;
}

export function OrderDetails({ orderId, createdAt }: IOrderDetails) {
  return (
    <div className="flex flex-col justify-evenly">
      <h1 className="text-lg font-semibold">
        <Link to={`/account/order/${orderId}`}>
          Order ID: {`${orderId.substring(0, 8)}...`}
        </Link>
      </h1>
      <h1>{formateDate(createdAt)} </h1>
    </div>
  );
}
