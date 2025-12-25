import BotonSimple from "../shared/components/BotonSimple";
import NavbarPublic from "../shared/components/NavbarPublic";

function PaginaError() {
  return (
    <>
    <NavbarPublic />
      <h1>Ufa!</h1>
      <p>La página que buscas no existe</p>
      <BotonSimple>Ok! Volvamos</BotonSimple>
    </>
  );
}

export default PaginaError;
