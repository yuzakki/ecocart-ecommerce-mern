// Imports: Libraries
import { Link } from 'react-router-dom';

// Imports: APIs | Utils
import { useGetCkeckoutSession } from '@features/orders/hooks/use-checkout';

// Imports: Components
import { ConfirmOrderError, Loader } from '../common/loaders-ui';
import { Button } from '@components/ui/button';

export default function ConfirmOrder() {
  const { order, isLoading, isError, error } = useGetCkeckoutSession();

  if (isLoading) return <Loader />;

  if (isError) return <ConfirmOrderError message={error?.message} />;

  return (
    <div>
      <div className="w-full px-4 py-3 mx-auto mt-3 space-y-4 text-green-700 bg-green-100 border-l-4 border-green-500 rounded-md shadow-md md:w-1/2">
        <h2 className="text-lg font-semibold">Order Successfully Purchased!</h2>
        <p className="mt-2">Your order details:</p>

        <ul className="mt-2 list-disc list-inside">
          <li>
            Order ID:{' '}
            <Link to={`/account/order/${order?._id}`}>{order?._id}</Link>
          </li>
          <li>Total Amount: {order?.totalAmount}$</li>
        </ul>

        <Button asChild>
          <Link to="/account/orders">Show All Orders</Link>
        </Button>
      </div>
    </div>
  );
}
