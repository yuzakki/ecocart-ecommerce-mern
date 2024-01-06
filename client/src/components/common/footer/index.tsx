import { Link } from 'react-router-dom';
import { Logo } from '@assets/brand/logo';

export default function Footer() {
  return (
    <footer className="px-5 py-10 mt-32 bg-slate-100 h-fit">
      <div className="flex flex-col items-center justify-between gap-3 xs:flex-row xs:gap-0">
        <Logo />

        <h2 className="text-lg font-bold">
          Developer:{' '}
          <Link
            to="https://github.com/yuzakki"
            target="_blank"
            className="text-[#0cf] underline"
          >
            Hassan
          </Link>
        </h2>

        <h3 className="font-semibold">© 2024</h3>
      </div>
    </footer>
  );
}
