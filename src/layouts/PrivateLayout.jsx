import {Outlet} from 'react-router-dom';
import NavbarDesktop from '@/shared/components/layout/NavbarDesktop';
import NavbarMobile from '@/shared/components/layout/NavbarMobile';
import Footer from '@/shared/components/layout/Footer';

function PrivateLayout() {
  return (
    <div>
      <NavbarDesktop />
      <NavbarMobile />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
