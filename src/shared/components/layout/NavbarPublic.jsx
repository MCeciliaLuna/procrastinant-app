import {Link} from 'react-router-dom';
import LogoApp from '@/shared/components/layout/LogoApp';

function NavbarPublic() {
  return (
    <nav>
      <Link to="/">
        <LogoApp width="50px" />
      </Link>
    </nav>
  );
}

export default NavbarPublic;
