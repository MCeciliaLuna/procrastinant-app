import BotonConIcono from '@/shared/components/layout/BotonConIcono';

function InputTareaCreada() {
  return (
    <>
      <input type="text" name="tarea" id="tarea" defaultValue="Tarea creada" />{' '}
      <BotonConIcono icon="check" /> <BotonConIcono icon="delete" />
    </>
  );
}
export default InputTareaCreada;
