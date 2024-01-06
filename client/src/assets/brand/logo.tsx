import { ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ILogo {
  background?: string;
}

export function Logo({ background = 'text-slate-900' }: ILogo) {
  return (
    <Link to="/">
      <div className="flex items-center space-x-1">
        <ShoppingBasket size={25} color="#0cf" />
        <h1 className={`${background} font-black text-lg sm:text-2xl `}>
          EcoCart
        </h1>
      </div>
    </Link>
  );
}
