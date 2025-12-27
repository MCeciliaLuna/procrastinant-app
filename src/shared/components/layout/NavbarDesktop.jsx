import LogoApp from '@/shared/components/layout/LogoApp';
import BotonLogout from '@/shared/components/layout/BotonLogout';
import {Link} from 'react-router-dom';

function NavbarDesktop() {
  return (
    <nav>
      <Link to="/dashboard">
        <LogoApp width="50px" />
      </Link>
      <div>
        <Link to="/configuracion">Configuración</Link>
        <BotonLogout />
      </div>
    </nav>
  );
}

export default NavbarDesktop;
