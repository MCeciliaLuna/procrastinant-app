import { Outlet } from 'react-router-dom';
import Footer from '../shared/components/Footer';

function PrivateLayout() {
  return (
    <div>
      <Navegacion />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
