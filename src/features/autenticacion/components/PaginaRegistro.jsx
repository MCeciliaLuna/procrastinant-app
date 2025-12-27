import Title from '@/shared/components/layout/Title';
import RegisterForm from '@/shared/components/RegisterForm';

function PaginaRegistro() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center">
      <Title level={1} className="font-primary text-[2em] text-orange pb-5 pt-5 text-center">Registro</Title>
      <RegisterForm />
    </div>
  );
}

export default PaginaRegistro;
