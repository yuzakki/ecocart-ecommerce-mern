// Imports: Libraries
import { cn } from '@lib/utils';

// Imports: APIs | Utils
import { useGetCurrentUser } from '@features/authentication/hooks/use-auth';

// Imports: Components
import { SideBarLink } from './side-bar-links';
import { UserInfo } from './user-info';
import { ProfilePicture } from './profile-picture';

export interface ILink {
  title: string;
  href: string;
}

const links: ILink[] = [
  {
    title: 'Profile',
    href: '/account',
  },
  {
    title: 'View Orders',
    href: '/account/orders',
  },
  {
    title: 'Settings',
    href: '/account/settings',
  },
];

export default function SideBar() {
  const { user, isLoading } = useGetCurrentUser();

  return (
    <>
      <section>
        <ProfilePicture user={user} isLoading={isLoading} />
        <UserInfo user={user} isLoading={isLoading} />
      </section>

      <section className="flex flex-col justify-between h-full mt-5 space-y-1">
        <div
          className={cn('flex space-x-2 flex-col lg:space-x-0 lg:space-y-1')}
        >
          {links.map((link: ILink) => (
            <SideBarLink link={link} key={link.title} />
          ))}
        </div>
      </section>
    </>
  );
}
