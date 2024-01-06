import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';

interface INoOrdersError {
  message: string | undefined;
}

export const NoOrdersItemsError: FC<INoOrdersError> = ({ message }) => {
  return (
    <div className="w-full mx-auto mt-16 text-center">
      <h1 className="text-3xl font-black text-sl">{message}</h1>
      <Button variant="outline" className="mt-5" asChild>
        <Link to="/" replace>
          Go Shopping
        </Link>
      </Button>
    </div>
  );
};
