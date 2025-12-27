import BotonSimple from '@/shared/components/layout/BotonSimple';
import Title from '@/shared/components/layout/Title';
import Parrafo from '@/shared/components/layout/Parrafo';

function PaginaError() {
  return (
    <>
      <Title level={1}>Ufa!</Title>
      <Parrafo>La página que buscas no está disponible</Parrafo>
      <BotonSimple>Ok! Volvamos</BotonSimple>
    </>
  );
}

export default PaginaError;
