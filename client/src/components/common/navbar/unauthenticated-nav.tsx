import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';

export function UnauthenticatedNav() {
  return (
    <div className="flex gap-3 ">
      <Button variant="outline" asChild>
        <Link to="/login" className='hidden xxs:block'>Login</Link>
      </Button>
      <Button asChild>
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
