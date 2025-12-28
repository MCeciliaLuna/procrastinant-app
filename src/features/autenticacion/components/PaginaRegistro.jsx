import Title from "@/shared/components/layout/Title";
import RegisterForm from "@/shared/components/RegisterForm";

function PaginaRegistro() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center">
      <section aria-labelledby="register-title">
        <Title
          id="register-title"
          level={1}
          className="text-shadow-xs text-shadow-white font-primary text-[2.1em] text-orange pb-5 pt-5 text-center"
        >
          Registro
        </Title>
        <RegisterForm />
      </section>
    </div>
  );
}

export default PaginaRegistro;
