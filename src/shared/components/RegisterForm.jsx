import { useState } from "react";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import BotonConIcono from "./layout/BotonConIcono";
import VerContraseniaIcon from "@/assets/icons/visibilidad-on-icon.svg";
import OcultarContraseniaIcon from "@/assets/icons/visibilidad-off-icon.svg";

function RegisterForm() {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] =
    useState(false);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const toggleMostrarConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(!mostrarConfirmarContrasena);
  };

  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150">
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre/s"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="apellido"
        id="apellido"
        placeholder="Apellido/s"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="alias"
        id="alias"
        placeholder="Alias"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="email"
        name="email"
        id="email"
        placeholder="Correo electrónico"
      />
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarContrasena ? "text" : "password"}
          placeholder="Contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={mostrarContrasena ? OcultarContraseniaIcon : VerContraseniaIcon}
          onClick={toggleMostrarContrasena}
        ></BotonConIcono>
      </div>
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarConfirmarContrasena ? "text" : "password"}
          placeholder="Confirmar contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarConfirmarContrasena
              ? OcultarContraseniaIcon
              : VerContraseniaIcon
          }
          onClick={toggleMostrarConfirmarContrasena}
        ></BotonConIcono>
      </div>
      <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white">
        Registrarse
      </BotonSimple>
    </form>
  );
}
export default RegisterForm;
