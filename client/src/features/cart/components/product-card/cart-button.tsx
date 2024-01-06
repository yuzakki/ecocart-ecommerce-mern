import { FC } from 'react';

import { Button } from '@components/ui/button';
import { LoaderSpinner } from '@components/loaders/loader-spinner';

interface ICartButton {
  icon: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  minMaxItems?: boolean;
}

export const CartButton: FC<ICartButton> = ({
  icon,
  onClick,
  disabled,
  minMaxItems,
}) => (
  <Button
    variant="outline"
    onClick={onClick}
    size="icon"
    disabled={disabled || minMaxItems}
  >
    {disabled ? <LoaderSpinner /> : icon}
  </Button>
);
