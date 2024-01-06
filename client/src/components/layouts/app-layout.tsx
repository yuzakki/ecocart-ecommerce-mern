import { Outlet } from 'react-router-dom';

import Navbar from '@components/common/navbar';
import Footer from '@components/common/footer';

export default function AppLayout() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen px-4 md:px-5">
        <Navbar />

        {/* <main className="flex-1 px-24"> */}
        <main className="flex-1 px-0 lg:px-16">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
