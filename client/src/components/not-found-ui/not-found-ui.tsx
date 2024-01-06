import { NotFoundSVG } from '@assets/svg/not-found-svg';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const NotFoundUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between mt-16">
      <div className="flex flex-col justify-center basis-1/2">
        <h1 className="font-black text-7xl oops">Oops!</h1>

        <h2 className="mt-10 text-3xl font-bold ">{children}</h2>

        <div className="mt-6">
          <Button variant="returnback">
            <Link to="/" replace>
              Go back to homepage
            </Link>
          </Button>
        </div>
      </div>
      <div className="basis-1/2">
        <NotFoundSVG />
      </div>
    </div>
  );
};
