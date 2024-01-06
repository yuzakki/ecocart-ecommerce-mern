import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';

interface INoItemsError {
  message: string | undefined;
}

export function NoItemsError({ message }: INoItemsError) {
  return (
    <div className="w-full mx-auto mt-16 text-center">
      <h1 className="text-2xl font-black md:text-3xl text-sl">
        {message}
      </h1>
      <Button variant="outline" className="mt-5" asChild>
        <Link to="/" replace>
          Go Shopping
        </Link>
      </Button>
    </div>
  );
}
