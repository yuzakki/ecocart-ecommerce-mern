import { IOrderItem } from '@utils/typings/order';

interface IOrderItemDetails {
  item: IOrderItem;
}

export function OrderItemDetails({ item }: IOrderItemDetails) {
  const { _id, product, quantity } = item || {};
  const { title, category, images, price } = product || {};

  return (
    <div
      key={_id}
      className="flex flex-col justify-between gap-2 p-4 border rounded-sm md:flex-row"
    >
      <div className="flex gap-3">
        <img src={images?.[0]} className="w-24 h-24 rounded-sm" alt={title} />

        <div className="flex flex-col justify-evenly">
          <h1 className="text-base font-semibold md:text-lg">{title}</h1>
          <h1 className="text-base font-normal">{category?.name}</h1>
        </div>
      </div>

      <div className="flex items-end justify-between mt-3 md:flex-col md:justify-evenly md:mt-0">
        <h1 className="text-2xl font-semibold">{price}$</h1>
        <h1 className="text-sm font-normal">QTY: {quantity}</h1>
      </div>
    </div>
  );
}
