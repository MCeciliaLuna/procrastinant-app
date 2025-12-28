import { useState } from "react";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import VerContraseniaIcon from "@/assets/icons/visibilidad-on-icon.svg";
import OcultarContraseniaIcon from "@/assets/icons/visibilidad-off-icon.svg";
import BotonConIcono from "./layout/BotonConIcono";

function LoginForm() {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 h-50 justify-center items-center px-5 w-[90vw] md:w-150">
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="email"
        name="email"
        id="email"
        placeholder="Correo electrónico"
        required
        autoComplete="email"
        aria-label="Correo electrónico"
      />
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarContrasena ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Contraseña"
          required
          minLength="8"
          autoComplete="current-password"
          aria-label="Contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={mostrarContrasena ? OcultarContraseniaIcon : VerContraseniaIcon}
          onClick={toggleMostrarContrasena}
          aria-label={
            mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          type="button"
        ></BotonConIcono>
      </div>
      <BotonSimple
        type="submit"
        className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
      >
        Iniciar Sesión
      </BotonSimple>
    </form>
  );
}
export default LoginForm;
