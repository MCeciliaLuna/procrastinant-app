import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import LogoApp from "@/shared/components/layout/LogoApp";
import { Link, NavLink } from "react-router-dom";
import ConfigurationIcon from "@/assets/icons/configuration-icon.svg";
import BotonSimple from "./BotonSimple";

function NavbarDesktop() {
  return (
    <nav className="bg-lightsecondary saturate-120 flex items-center justify-between py-4 px-6 w-screen h-[10vh] fixed z-50">
      <Link to="/dashboard">
        <LogoApp width="50px" />
      </Link>
      <div className="flex align-center justify-end gap-4 w-100">
        <NavLink
          to="/configuracion"
          className="flex align-center justify-center"
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          {({ isActive }) => (
            <BotonConIcono
              icon={ConfigurationIcon}
              className="text-dark cursor-pointer font-secondary"
              aria-label="Configuración"
            />
          )}
        </NavLink>
        <BotonSimple
          className="bg-orange font-secondary p-3 rounded shadow w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
          aria-label="Cerrar sesión"
        >
          Cerrar Sesión
        </BotonSimple>
      </div>
    </nav>
  );
}

export default NavbarDesktop;
