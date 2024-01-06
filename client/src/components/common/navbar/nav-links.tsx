import { Link } from 'react-router-dom';

interface ILinks {
  label: string;
  path: string;
}

const Links: ILinks[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Featured',
    path: '/featured',
  },
  {
    label: 'Recommended',
    path: '/recommended',
  },
];

export function NavLinks() {
  return (
    <ul className="items-center hidden gap-4 md:flex">
      {Links.map((link) => (
        <LinkItem link={link} key={link.label} />
      ))}
    </ul>
  );
}

function LinkItem({ link }: { link: ILinks }) {
  return (
    <li key={link.label} className="font-medium text-slate-600">
      <Link to={link.path}>{link.label}</Link>
    </li>
  );
}
