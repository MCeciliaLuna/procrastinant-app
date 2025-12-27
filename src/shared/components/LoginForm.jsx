import BotonSimple from "@/shared/components/layout/BotonSimple";

function LoginForm() {
  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 h-50 justify-center items-center px-5 w-[90vw]">
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="email"
        placeholder="Correo electrónico"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="password"
        placeholder="Contraseña"
      />
      <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white">
        Iniciar Sesión
      </BotonSimple>
    </form>
  );
}
export default LoginForm;
