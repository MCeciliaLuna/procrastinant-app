import Title from "@/shared/components/layout/Title";
import FormConfiguracionUsuario from "@/shared/components/FormConfiguracionUsuario";
import FormCambioContraseña from "@/shared/components/FormCambioContraseña";
import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import DangerIcono from "@/assets/icons/peligro-white-icon.svg";

function PaginaConfiguracion() {
  return (
    <div className="flex flex-col justify-center align-center">
      <Title
        level={1}
        className="py-5 mt-5 text-shadow-xs text-shadow-white font-primary text-[2em] text-orange pb-5 pt-5 text-center"
      >
        Configuración de usuario
      </Title>
      <div className=" flex justify-center">
        <FormConfiguracionUsuario />
      </div>
      <Title
        level={2}
        className="text-shadow-xs text-shadow-white font-primary text-[1.5em] text-orange pb-5 mt-10 text-center"
      >
        Cambio de contraseña
      </Title>
      <div className=" flex justify-center">
        <FormCambioContraseña />
      </div>

      <div className="flex justify-center my-10">
        <BotonConIcono
          icon={DangerIcono}
          text="Cerrar sesión"
          className="bg-red-500 font-bold font-secondary p-3 rounded shadow-xl w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
          aria-label="Eliminar cuenta"
          type="button"
        >
          Eliminar cuenta
        </BotonConIcono>
      </div>
    </div>
  );
}

export default PaginaConfiguracion;
