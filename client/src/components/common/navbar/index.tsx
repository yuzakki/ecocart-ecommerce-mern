// Imports: APIs | Utils
import { useGetCurrentUser } from '@features/authentication/hooks/use-auth';

// Imports: Components
import { Skeleton } from '@components/ui/skeleton';
import { Logo } from '@assets/brand/logo';

import { AuthenticatedNav } from './authenticated-nav';
import { UnauthenticatedNav } from './unauthenticated-nav';
import { NavLinks } from './nav-links';

export default function Navbar() {
  const { isSuccess: isAuthenticated, isLoading } = useGetCurrentUser();

  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex items-center gap-5">
        <Logo />
        <NavLinks />
      </div>

      {isLoading && <Skeleton className="w-32 h-10 md:w-72" />}
      {!isLoading && isAuthenticated && <AuthenticatedNav />}
      {!isLoading && !isAuthenticated && <UnauthenticatedNav />}
    </div>
  );
}
