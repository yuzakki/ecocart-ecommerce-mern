import { FC } from 'react';

import { Skeleton } from '@components/ui/skeleton';
import { IProductDetails } from '.';

export const ProductDetailsHeader: FC<IProductDetails> = ({
  product,
  isLoading,
}) => {
  return (
    <div className="space-y-4">
      <span className="text-sm font-normal text-slate-400">
        {isLoading && <Skeleton className="w-1/4 h-7" />}
        {!isLoading && `Category:  ${product?.category.name}`}
      </span>

      <h1 className="my-2 text-2xl font-bold">
        {isLoading && <Skeleton className="w-1/3 mt-5 h-7" />}
        {!isLoading && product?.title}
      </h1>

      <p className="text-base font-normal max-w-[500px] text-slate-600">
        {isLoading && (
          <div className="mt-5 space-y-2">
            <Skeleton className="w-[85%] h-7" />
            <Skeleton className="w-[90%] h-7" />
          </div>
        )}
        {!isLoading && product?.description}
      </p>
    </div>
  );
};
