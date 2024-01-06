import { Link } from 'react-router-dom';
import { ShoppingCart, User2 } from 'lucide-react';
import { Button } from '@components/ui/button';

export function AuthenticatedNav() {
  return (
    // space-x-2
    <div className="flex items-center">
      <Button variant="ghost" asChild>
        <Link to="/cart">
          <ShoppingCart />
        </Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link to="/account">
          <User2 />
        </Link>
      </Button>
    </div>
  );
}
