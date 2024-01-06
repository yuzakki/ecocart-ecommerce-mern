// Imports: APIs | Utils
import { IProduct } from '@utils/typings/product';

// Imports: Components
import { ProductsGridBody } from './products-grid-body';
import { ProductsGridHeader } from './products-grid-header';

interface IProductGrid {
  title?: string;
  isLoading: boolean;
  data: IProduct[];
}

export default function ProductsGrid({ title, data, isLoading }: IProductGrid) {
  return (
    <div className="w-full mt-8 md:mt-12">
      {title && <ProductsGridHeader title={title} />}
      <ProductsGridBody data={data} isLoading={isLoading} />
    </div>
  );
}
