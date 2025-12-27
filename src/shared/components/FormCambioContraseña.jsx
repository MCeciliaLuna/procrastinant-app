import BotonSimple from "@/shared/components/layout/BotonSimple";

function FormCambioContraseña() {
  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] mb-5">
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="password"
        name="contrasenaActual"
        id="contrasenaActual"
        placeholder="Contraseña Actual"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="password"
        name="nuevaContrasena"
        id="nuevaContrasena"
        placeholder="Nueva Contraseña"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="password"
        name="confirmarContrasena"
        id="confirmarContrasena"
        placeholder="Confirmar Nueva Contraseña"
      />
      <BotonSimple className="bg-orange font-secondary p-3 rounded shadow-xl w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white">
        Cambiar Contraseña
      </BotonSimple>
    </form>
  );
}
export default FormCambioContraseña;
