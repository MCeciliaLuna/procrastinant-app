import Frase from "@/shared/components/Frase";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import Title from "@/shared/components/layout/Title";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Title
          level={1}
          className="font-primary text-[2.5em] text-orange pb-5 mt-5"
        >
          Procrastinan&apos;t App
        </Title>
      </div>
      <div className="py-5 mt-2">
        <Frase className="font-secondary text-[1.2em]" />
      </div>
      <div className="flex items-center justify-center gap-5 pt-5">
        <Link to="/login">
          <BotonSimple className="bg-green font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out">
            Iniciar sesión
          </BotonSimple>
        </Link>
        <Link to="/registro">
          <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out">
            Registrarse
          </BotonSimple>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;
