// Imports: Libraries
import { Outlet, useLocation } from 'react-router-dom';

// Imports: APIs | Utils
import { useGetCurrentUser } from '@features/authentication/hooks/use-auth';

// Imports: Components
import { ThreeDotsLoader } from '@components/loaders/global-loader';
import SideBar from '@features/account/side-bar';
import UserDetails from '@features/account/user-details';

export default function AccountLayout() {
  const pathname = useLocation().pathname;
  const { isLoading, isSuccess: isAuthenticated } = useGetCurrentUser();

  if (isLoading) return <ThreeDotsLoader />;

  if (!isAuthenticated) {
    return (
      <div>
        <h2 className="mt-10 text-2xl font-semibold text-center text-red-500">
          You are not logged in. Please log in to get access
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-5 border rounded-lg min-h-[550px]">
      <section className="basis-[25%] p-5 border-b border-b-border md:border-r-border md:border-b-transparent md:border-r">
        <SideBar />
      </section>

      <section className="basis-[75%] ">
        <div className="py-8 px-4 md:px-10 min-h-[550px]">
          {pathname === '/account' && <UserDetails />}
          {<Outlet />}
        </div>
      </section>
    </div>
  );
}
