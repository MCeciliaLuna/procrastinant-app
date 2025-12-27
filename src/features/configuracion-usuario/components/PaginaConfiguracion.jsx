import Title from '@/shared/components/layout/Title';
import FormConfiguracionUsuario from '@/shared/components/FormConfiguracionUsuario';
import FormCambioContraseña from '@/shared/components/FormCambioContraseña';

function PaginaConfiguracion() {
  return (
    <>
      <Title level={1}>Configuración de usuario</Title>
      <FormConfiguracionUsuario />
      <hr />
      <FormCambioContraseña />
    </>
  );
}

export default PaginaConfiguracion;
