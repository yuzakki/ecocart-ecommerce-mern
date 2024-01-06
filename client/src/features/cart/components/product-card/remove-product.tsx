import { FC } from 'react';
import { X } from 'lucide-react';

import { CartButton } from './cart-button';

interface IRemoveProduct {
  _id: string;
  removeItem: (itemId: string) => void;
  isLoading: boolean;
}

export const RemoveProduct: FC<IRemoveProduct> = ({
  _id,
  removeItem,
  isLoading,
}) => (
  <CartButton
    icon={<X size={18} />}
    onClick={() => removeItem(_id)}
    disabled={isLoading}
  />
);
