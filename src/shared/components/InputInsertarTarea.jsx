import BotonConIcono from '@/shared/components/layout/BotonConIcono';

function InputInsertarTarea() {
  return (
    <form>
      <input type="text" name="tarea" id="tarea" placeholder="Tarea" />
      <BotonConIcono icon="microfono" />
    </form>
  );
}
export default InputInsertarTarea;
