import { Link, useLocation } from 'react-router-dom';
import { cn } from '@lib/utils';
import { buttonVariants } from '@components/ui/button';
import { ILink } from '.';

interface ISideBarLink {
  link: ILink;
}

export function SideBarLink({ link }: ISideBarLink) {
  const pathname = useLocation().pathname;

  return (
    <Link
      key={link.href}
      to={link.href}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        pathname === link.href
          ? 'bg-muted hover:bg-muted'
          : 'hover:bg-transparent hover:underline',
        'justify-start'
      )}
    >
      {link.title}
    </Link>
  );
}
