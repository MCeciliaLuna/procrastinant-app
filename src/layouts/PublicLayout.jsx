import {Outlet} from 'react-router-dom';
import NavbarPublic from '@/shared/components/layout/NavbarPublic';
import Footer from '@/shared/components/layout/Footer';

function PublicLayout() {
  return (
    <div>
      <NavbarPublic />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
