import {Link} from 'react-router-dom';
import Parrafo from '@/shared/components/layout/Parrafo';

function Footer() {
  return (
    <footer>
      <Parrafo>
        ¡Vos podés! ✔ <span>Procrastinant App</span> por{' '}
        <strong>
          <Link
            href="https://mcecilialuna-dev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ceci :)
          </Link>
        </strong>
      </Parrafo>
    </footer>
  );
}

export default Footer;
