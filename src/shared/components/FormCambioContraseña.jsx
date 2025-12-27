import BotonSimple from '@/shared/components/layout/BotonSimple';

function FormCambioContraseña() {
  return (
    <form>
      <input
        type="password"
        name="contrasenaActual"
        id="contrasenaActual"
        placeholder="Contraseña Actual"
      />
      <input
        type="password"
        name="nuevaContrasena"
        id="nuevaContrasena"
        placeholder="Nueva Contraseña"
      />
      <input
        type="password"
        name="confirmarContrasena"
        id="confirmarContrasena"
        placeholder="Confirmar Nueva Contraseña"
      />
      <BotonSimple>Cambiar Contraseña</BotonSimple>
    </form>
  );
}
export default FormCambioContraseña;
