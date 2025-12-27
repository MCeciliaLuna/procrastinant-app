import Frase from "@/shared/components/layout/Frase";
import Title from "@/shared/components/layout/Title";
import InputInsertarTarea from "@/shared/components/InputInsertarTarea";
import InputTareaCreada from "@/shared/components/InputTareaCreada";

function PaginaDashboard() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center">
      <Title
        level={1}
        className="text-shadow-xs text-shadow-white font-primary text-[2.5em] text-orange pb-5 mt-5"
      >
        Hola! [nombre]
      </Title>
      <InputInsertarTarea />
      {/* <InputTareaCreada /> */}
      <Frase className="font-secondary py-10 text-[1.2em]" />
    </div>
  );
}

export default PaginaDashboard;
