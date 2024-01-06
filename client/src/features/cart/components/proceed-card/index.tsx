// Imports: Libraries
import { FC } from 'react';
import { Link } from 'react-router-dom';

// Imports: APIs | Utils
import { useCreateCheckoutSession } from '@features/orders/hooks/use-checkout';
import { ITotal } from '@utils/typings/cart';

// Imports: Components
import { Button } from '@components/ui/button';
import { LoaderSpinner } from '@components/loaders/loader-spinner';

interface IProceedCard {
  totals: ITotal;
}

export const ProceedCard: FC<IProceedCard> = ({ totals }) => {
  const { createCheckoutSession, isLoading } = useCreateCheckoutSession();

  return (
    <div className="border px-4 md:px-6 py-10 basis-[35%] flex flex-col rounded-md">
      <div className="flex flex-col items-start justify-between space-y-4">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Subtotal: ({totals?.totalItems || 0} items)
        </h1>
        <h1 className="text-3xl font-semibold">${totals?.subtotal || 0}</h1>
      </div>

      <div className="flex flex-col mt-10 space-y-4">
        <Button
          className="flex items-center gap-3"
          disabled={isLoading || !totals}
          onClick={() => createCheckoutSession()}
        >
          {isLoading && <LoaderSpinner bg="#fff" size={20} />}
          {isLoading ? 'Processing...' : 'Proceed to checkout'}
        </Button>

        <Button variant="outline" disabled={isLoading} asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};
