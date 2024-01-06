import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';

export function ProductsGridHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <Link to={`/${title.toLowerCase()}`}>
        <h1 className="text-[20px] font-semibold sm:text-3xl">
          {title} Products
        </h1>
      </Link>
      <Button variant="link" className="hidden text-lg font-semibold sm:block">
        <Link to={`/${title.toLowerCase()}`}>See All</Link>
      </Button>
    </div>
  );
}
