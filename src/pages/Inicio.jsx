import LogoApp from '@/shared/components/layout/LogoApp';
import Frase from '@/shared/components/Frase';
import BotonSimple from '@/shared/components/layout/BotonSimple';
import Title from '@/shared/components/layout/Title';

function Inicio() {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-20 rounded">
        <Title level={1} className="font-primary text-4xl text-orange">
          Procrastinan&apos;t App
        </Title>
      </div>
      <div className="w-screen">
        <LogoApp className="relative left-10" />
      </div>
      <Frase />
      <>
        <BotonSimple>Iniciar sesión</BotonSimple>
        <BotonSimple>Registrarse</BotonSimple>
      </>
    </>
  );
}

export default Inicio;
