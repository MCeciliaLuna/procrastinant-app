import BotonSimple from "@/shared/components/layout/BotonSimple";

function FormConfiguracionUsuario() {
  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150">
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="nombre"
        id="nombre"
        defaultValue="Nombre"
        autoComplete="given-name"
        aria-label="Nombre o nombres"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="apellido"
        id="apellido"
        defaultValue="Apellido"
        autoComplete="family-name"
        aria-label="Apellido o apellidos"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="alias"
        id="alias"
        defaultValue="Alias"
        autoComplete="nickname"
        aria-label="Alias o apodo"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="email"
        name="email"
        id="email"
        defaultValue="Email@mail.com"
        autoComplete="email"
        aria-label="Correo electrónico"
      />
      <BotonSimple
        type="submit"
        className="bg-orange font-secondary p-3 rounded shadow-xl w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
      >
        Guardar Cambios
      </BotonSimple>
    </form>
  );
}
export default FormConfiguracionUsuario;
