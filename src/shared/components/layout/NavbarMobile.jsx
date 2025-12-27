import { useState } from "react";
import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import LogoApp from "@/shared/components/layout/LogoApp";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@/assets/icons/menu-icon.svg";
import ConfigurationIcon from "@/assets/icons/configuration-icon.svg";
import BotonSimple from "./BotonSimple";
import CloseIcon from "@/assets/icons/close-icon.svg";

function NavbarMobile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between py-4 px-6 bg-transparent w-screen h-[10vh] fixed z-50">
        <Link to="/dashboard">
          <LogoApp width="45px" />
        </Link>
        <BotonConIcono
          icon={MenuIcon}
          className="text-orange cursor-pointer"
          onClick={toggleSidebar}
        ></BotonConIcono>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-dark/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-70 bg-light z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex justify-end">
          <BotonConIcono
            icon={CloseIcon}
            onClick={closeSidebar}
          ></BotonConIcono>
        </div>
        <div className="flex flex-col gap-4">
          <NavLink
            to="/configuracion"
            className="flex align-center justify-end w-full"
            onClick={closeSidebar}
          >
            <BotonConIcono
              icon={ConfigurationIcon}
              className="text-dark cursor-pointer font-secondary mb-5 pr-5"
            >
              Configuración
            </BotonConIcono>
          </NavLink>
          <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-full cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out">
            Cerrar Sesión
          </BotonSimple>
        </div>
      </div>
    </>
  );
}

export default NavbarMobile;
