import LogoApp from "@/shared/components/layout/LogoApp";
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
          className="font-primary text-5xl text-orange pb-5 mt-10"
        >
          Procrastinan&apos;t App
        </Title>
      </div>
      <div className="w-screen flex items-center justify-center">
        <LogoApp width="200px" />
      </div>
      <div className="py-5 mt-2">
        <Frase className="font-secondary text-[1.2em]" />
      </div>
      <div className="flex items-center justify-center gap-5 pt-5">
        <Link to="/login">
          <BotonSimple className="bg-green font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none transition-all">
            Iniciar sesión
          </BotonSimple>
        </Link>
        <Link to="/register">
          <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none transition-all">
            Registrarse
          </BotonSimple>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;
