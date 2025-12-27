import Title from "@/shared/components/layout/Title";
import FormConfiguracionUsuario from "@/shared/components/FormConfiguracionUsuario";
import FormCambioContraseña from "@/shared/components/FormCambioContraseña";

function PaginaConfiguracion() {
  return (
    <div className="flex flex-col justify-center align-center">
      <Title
        level={1}
        className="text-shadow-xs text-shadow-white font-primary text-[2em] text-orange pb-5 pt-5 text-center"
      >
        Configuración de usuario
      </Title>
      <div className="w-screen flex justify-center">
        <FormConfiguracionUsuario />
      </div>
      <Title
        level={2}
        className="text-shadow-xs text-shadow-white font-primary text-[1.5em] text-orange pb-5 mt-10 text-center"
      >
        Cambio de contraseña
      </Title>
      <div className="w-screen flex justify-center">
        <FormCambioContraseña />
      </div>
    </div>
  );
}

export default PaginaConfiguracion;
