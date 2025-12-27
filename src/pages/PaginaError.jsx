import BotonSimple from "@/shared/components/layout/BotonSimple";
import Title from "@/shared/components/layout/Title";
import Parrafo from "@/shared/components/layout/Parrafo";
import { Link } from "react-router-dom";

function PaginaError() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Title level={1} className="font-primary text-[5em] text-orange pb-5">
        Ufa!
      </Title>
      <Parrafo className="text-center font-secondary text-dark px-5">
        La página que buscas no está disponible
      </Parrafo>
      <Link to="/">
        <BotonSimple className="bg-lightsecondary font-secondary mt-5 p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none transition delay-50 duration-150 ease-in-out">
          Ok! Volvamos
        </BotonSimple>
      </Link>
    </div>
  );
}

export default PaginaError;
