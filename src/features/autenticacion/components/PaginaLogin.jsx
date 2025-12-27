import LoginForm from '@/shared/components/LoginForm';
import Title from '@/shared/components/layout/Title';

function PaginaLogin() {
  return (
    <>
      <Title level={1}>Ingresa a tu cuenta</Title>
      <LoginForm />
    </>
  );
}

export default PaginaLogin;
