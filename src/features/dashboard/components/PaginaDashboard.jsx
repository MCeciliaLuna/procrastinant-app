import Frase from '@/shared/components/layout/Frase';
import Title from '@/shared/components/layout/Title';
import InputInsertarTarea from '@/shared/components/InputInsertarTarea';
import InputTareaCreada from '@/shared/components/InputTareaCreada';

function PaginaDashboard() {
  return (
    <>
      <Title level={1}>Hola! [nombre]</Title>
      <Frase />
      <InputInsertarTarea />
      <InputTareaCreada />
    </>
  );
}

export default PaginaDashboard;
