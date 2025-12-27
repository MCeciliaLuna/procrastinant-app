import BotonSimple from "@/shared/components/layout/BotonSimple";

function RegisterForm() {
  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw]">
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
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="password"
        name="contraseña"
        id="contraseña"
        placeholder="Contraseña"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="password"
        name="confirmar-contraseña"
        id="confirmar-contraseña"
        placeholder="Confirmar Contraseña"
      />
      <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out">
        Registrarse
      </BotonSimple>
    </form>
  );
}
export default RegisterForm;
