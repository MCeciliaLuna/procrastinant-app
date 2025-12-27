import BotonSimple from '@/shared/components/layout/BotonSimple';

function LoginForm() {
  return (
    <form>
      <input type="email" placeholder="Correo electrónico" />
      <input type="password" placeholder="Contraseña" />
      <BotonSimple>Iniciar Sesión</BotonSimple>
    </form>
  );
}
export default LoginForm;
