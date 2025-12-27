import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import LogoApp from "@/shared/components/layout/LogoApp";
import { Link, NavLink } from "react-router-dom";
import ConfigurationIcon from "@/assets/icons/configuration-icon.svg";
import BotonSimple from "./BotonSimple";

function NavbarDesktop() {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-transparent w-screen h-[10vh] fixed z-50">
      <Link to="/dashboard">
        <LogoApp width="50px" />
      </Link>
      <div className="flex align-center justify-end gap-4 w-100">
        <NavLink
          to="/configuracion"
          className="flex align-center justify-center"
        >
          <BotonConIcono
            icon={ConfigurationIcon}
            className="text-dark cursor-pointer font-secondary"
          ></BotonConIcono>
        </NavLink>
        <BotonSimple className="bg-orange font-secondary p-3 rounded shadow w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white">
          Cerrar Sesión
        </BotonSimple>
      </div>
    </nav>
  );
}

export default NavbarDesktop;
