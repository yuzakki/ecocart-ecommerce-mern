import { Minus, Plus } from 'lucide-react';
import { CartButton } from './cart-button';

interface IProductQuantity {
  _id: string;
  quantity: number;
  handleIncrement: (itemId: string) => void;
  handleDecrement: (itemId: string) => void;
  loadingState: Record<string, boolean>;
}

export function ProductQuantity({
  _id,
  quantity,
  handleIncrement,
  handleDecrement,
  loadingState,
}: IProductQuantity) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="font-medium">QTY: </h2>

      <div className="flex items-center space-x-2">
        <CartButton
          minMaxItems={quantity === 1}
          icon={<Minus size={18} />}
          onClick={() => handleDecrement(_id)}
          disabled={loadingState[`${_id}_dec`]}
        />

        <h1 className="text-base font-medium">{quantity}</h1>

        <CartButton
          minMaxItems={quantity === 20}
          icon={<Plus size={18} />}
          onClick={() => handleIncrement(_id)}
          disabled={loadingState[`${_id}_inc`]}
        />
      </div>
    </div>
  );
}
