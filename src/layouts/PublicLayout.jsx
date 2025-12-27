import {Outlet} from 'react-router-dom';
import NavbarPublic from '@/shared/components/layout/NavbarPublic';
import Footer from '@/shared/components/layout/Footer';
import backgroundImage from '@/assets/images/background-home.webp';

function PublicLayout() {
  return (
    <>
      <NavbarPublic />
      <main
        className="relative min-h-[90vh] bg-cover bg-center bg-no-repeat "
        style={{backgroundImage: `url(${backgroundImage})`}}
      >
        <div className="absolute inset-0 bg-lightsecondary/20 z-0 saturate-150"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
