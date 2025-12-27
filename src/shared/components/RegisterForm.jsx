import BotonSimple from '@/shared/components/layout/BotonSimple';

function RegisterForm() {
  return (
    <form>
      <input type="text" name="nombre" id="nombre" placeholder="Nombre" />
      <input type="text" name="apellido" id="apellido" placeholder="Apellido" />
      <input type="text" name="alias" id="alias" placeholder="Alias" />
      <input type="email" name="email" id="email" placeholder="Correo electrónico" />
      <input type="password" name="contraseña" id="contraseña" placeholder="Contraseña" />
      <input
        type="password"
        name="confirmar-contraseña"
        id="confirmar-contraseña"
        placeholder="Confirmar Contraseña"
      />
      <BotonSimple>Registrarse</BotonSimple>
    </form>
  );
}
export default RegisterForm;
