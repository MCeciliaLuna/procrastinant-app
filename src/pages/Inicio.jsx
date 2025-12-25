import LogoApp from '../shared/components/LogoApp';
import NavbarPublic from '../shared/components/NavbarPublic';
import Frase from '../shared/components/Frase';
import BotonSimple from '../shared/components/BotonSimple';

function Inicio() {
  return (
    <>
      <NavbarPublic />
      <LogoApp />
      <Frase />
      <div>
        <BotonSimple>Iniciar sesión</BotonSimple>
        <BotonSimple>Registrarse</BotonSimple>
      </div>
    </>
  );
}

export default Inicio;
