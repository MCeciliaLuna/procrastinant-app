import {Outlet} from 'react-router-dom';
import NavbarPublic from '@/shared/components/layout/NavbarPublic';
import Footer from '@/shared/components/layout/Footer';
import backgroundImage from '@/assets/images/background-home.webp';

function PublicLayout() {
  return (
    <>
      <NavbarPublic />
      <main
        className="relative min-h-screen bg-cover bg-center bg-no-repeat saturate-150"
        style={{backgroundImage: `url(${backgroundImage})`}}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
