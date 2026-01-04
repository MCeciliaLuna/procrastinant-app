import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import BotonConIcono from '@/shared/components/layout/BotonConIcono';
import MicrofonoIcon from '@/assets/icons/microfono-icon.svg';
import CrearIcon from '@/assets/icons/crear-icon.svg';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

function InputInsertarTarea({onCreate}) {
  const [value, setValue] = useState('');

  const {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setValue(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (error) {
      console.error('Speech Recognition Error:', error);
      alert(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    onCreate(value.trim());
    setValue('');
    resetTranscript();
  };

  const handleMicrophoneClick = () => {
    if (!isSupported) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-light rounded shadow mx-4 justify-between items-center p-2 w-[90vw] md:w-150"
    >
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="tarea"
        id="tarea"
        placeholder="Tarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Nueva tarea"
      />
      <div className="flex gap-2 justify-around p-1">
        <BotonConIcono
          icon={MicrofonoIcon}
          onClick={handleMicrophoneClick}
          className={
            `ml-1 rounded-4xl flex align-center justify-center ` +
            `w-10 h-10 cursor-pointer transition-colors ${
              isListening ?
                'bg-orange hover:bg-orange' :
                'active:bg-lightsecondary hover:bg-lightsecondary'
            } ${!isSupported && 'opacity-50 cursor-not-allowed'}`
          }
          aria-label={
            isListening ? 'Detener grabación' : 'Grabar tarea por voz'
          }
          type="button"
          disabled={!isSupported}
        />
        <BotonConIcono
          icon={CrearIcon}
          onClick={handleSubmit}
          className="active:bg-lightsecondary rounded-4xl flex align-center justify-center w-10 h-10 hover:bg-orange cursor-pointer"
          aria-label="Crear nueva tarea"
          type="submit"
        />
      </div>
    </form>
  );
}

InputInsertarTarea.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default InputInsertarTarea;
