import { Outlet } from 'react-router-dom';
import Footer from '../shared/components/Footer';

function PublicLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
