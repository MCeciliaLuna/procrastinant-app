import BotonSimple from '@/shared/components/layout/BotonSimple';

function FormConfiguracionUsuario() {
  return (
    <form>
      <input type="text" name="nombre" id="nombre" defaultValue="Nombre" />
      <input type="text" name="apellido" id="apellido" defaultValue="Apellido" />
      <input type="text" name="alias" id="alias" defaultValue="Alias" />
      <input type="email" name="email" id="email" defaultValue="Email@mail.com" />
      <BotonSimple>Guardar Cambios</BotonSimple>
    </form>
  );
}
export default FormConfiguracionUsuario;
