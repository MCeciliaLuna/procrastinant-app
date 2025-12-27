import Frase from "@/shared/components/layout/Frase";
import Title from "@/shared/components/layout/Title";
import InputInsertarTarea from "@/shared/components/InputInsertarTarea";
import InputTareaCreada from "@/shared/components/InputTareaCreada";

function PaginaDashboard() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <Title
        level={1}
        className="font-primary text-[2.5em] text-orange pb-5 mt-5"
      >
        Hola! [nombre]
      </Title>
      <Frase className="font-secondary text-[1.2em]" />
      <InputInsertarTarea />
      <InputTareaCreada />
    </div>
  );
}

export default PaginaDashboard;
