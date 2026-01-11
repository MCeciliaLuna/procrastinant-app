import {useState, useEffect, useRef} from 'react'
import {
  SPEECH_RECOGNITION_CONFIG,
  SPEECH_RECOGNITION_MESSAGES,
} from '@/config/constants'

function useSpeechRecognition () {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)
  const silenceTimeoutRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)

      const recognition = new SpeechRecognition()
      recognition.lang = SPEECH_RECOGNITION_CONFIG.LANGUAGE
      recognition.interimResults = SPEECH_RECOGNITION_CONFIG.INTERIM_RESULTS
      recognition.maxAlternatives = SPEECH_RECOGNITION_CONFIG.MAX_ALTERNATIVES
      recognition.continuous = SPEECH_RECOGNITION_CONFIG.CONTINUOUS

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcriptResult = event.results[current][0].transcript
        setTranscript(transcriptResult)

        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
        }

        silenceTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognition.stop()
          }
        }, SPEECH_RECOGNITION_CONFIG.SILENCE_TIMEOUT)
      }

      recognition.onend = () => {
        setIsListening(false)
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
        }
      }

      recognition.onerror = (event) => {
        setIsListening(false)
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
        }

        switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          setError(SPEECH_RECOGNITION_MESSAGES.PERMISSION_DENIED)
          break
        case 'no-speech':
          setError(SPEECH_RECOGNITION_MESSAGES.NO_SPEECH)
          break
        case 'network':
          setError(SPEECH_RECOGNITION_MESSAGES.NETWORK_ERROR)
          break
        case 'aborted':
          setError(SPEECH_RECOGNITION_MESSAGES.ABORTED)
          break
        default:
          setError(`Error: ${event.error}`)
        }
      }

      recognitionRef.current = recognition
    } else {
      setIsSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [])

  const startListening = () => {
    if (!isSupported) {
      setError(SPEECH_RECOGNITION_MESSAGES.NOT_SUPPORTED)
      return
    }

    setError(null)
    setTranscript('')

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      console.error('Error starting recognition:', err)
      setError('Error al iniciar el reconocimiento')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const resetTranscript = () => {
    setTranscript('')
    setError(null)
  }

  return {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  }
}

export default useSpeechRecognition
