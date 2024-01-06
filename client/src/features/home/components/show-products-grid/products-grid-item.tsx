import { Link } from 'react-router-dom';
import { IProduct } from '@utils/typings/product';

interface IProductGridItem {
  product: IProduct;
}
export function ProductsGridItem({ product }: IProductGridItem) {
  const onlyTwoWordsTitle =
    product?.title?.split(' ').slice(0, 2).join(' ') || '';

  return (
    <div className="overflow-hidden">
      <div className="w-4/5 mx-auto overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            className="w-full mx-auto transition-transform rounded-md"
            src={product?.images[0]}
            alt={product?.title}
          />
        </Link>

        <div className="absolute -translate-y-10 translate-x-2.5 ">
          <span className="relative px-4 py-2 font-medium rounded-lg">
            {product.category.name}
            <span className="absolute inset-0 w-full h-full bg-white rounded-lg opacity-70 -z-10"></span>
          </span>
        </div>
      </div>

      <div className="flex justify-between w-4/5 py-3 mx-auto mt-2 gap-x-0.5">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold md:text-base lg:text-lg text-slate-900">
            {onlyTwoWordsTitle}
          </h2>
        </Link>

        <h2 className="font-normal">{product?.price}$</h2>
      </div>
    </div>
  );
}
