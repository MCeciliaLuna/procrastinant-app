import BotonConIcono from '@/shared/components/layout/BotonConIcono';
import BotonLogout from '@/shared/components/layout/BotonLogout';
import LogoApp from '@/shared/components/layout/LogoApp';
import {Link} from 'react-router-dom';

function NavbarMobile() {
  return (
    <>
      <BotonConIcono icon="menu"></BotonConIcono>
      <>
        <nav>
          <Link to="/dashboard">
            <LogoApp width="50px" />
          </Link>
          <>
            <BotonConIcono icon="configuracion"></BotonConIcono>
            <BotonLogout />
          </>
        </nav>
      </>
    </>
  );
}

export default NavbarMobile;
