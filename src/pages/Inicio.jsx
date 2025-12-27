import LogoApp from '@/shared/components/layout/LogoApp';
import Frase from '@/shared/components/Frase';
import BotonSimple from '@/shared/components/layout/BotonSimple';
import Title from '@/shared/components/layout/Title';

function Inicio() {
  return (
    <>
      <Title level={1}>Procrastinant App</Title>
      <LogoApp />
      <Frase />
      <>
        <BotonSimple>Iniciar sesión</BotonSimple>
        <BotonSimple>Registrarse</BotonSimple>
      </>
    </>
  );
}

export default Inicio;
