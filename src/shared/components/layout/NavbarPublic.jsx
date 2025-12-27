import {Link} from 'react-router-dom';
import LogoApp from '@/shared/components/layout/LogoApp';

function NavbarPublic() {
  return (
    <nav className="flex items-center justify-start p-4 bg-lightsecondary w-screen h-[10vh] border-light">
      <Link to="/">
        <LogoApp width="45px" />
      </Link>
    </nav>
  );
}

export default NavbarPublic;
