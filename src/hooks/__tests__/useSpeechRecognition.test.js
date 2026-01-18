import {renderHook, act} from '@testing-library/react'
import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import useSpeechRecognition from '../useSpeechRecognition'

const mockSpeechRecognition = vi.fn()

describe('useSpeechRecognition', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockSpeechRecognition.mockImplementation(() => ({
      start: vi.fn(),
      stop: vi.fn(),
      lang: '',
      interimResults: false,
      maxAlternatives: 1,
      continuous: false,
      onresult: null,
      onerror: null,
      onend: null,
    }))

    global.SpeechRecognition = mockSpeechRecognition
    global.webkitSpeechRecognition = undefined
  })

  afterEach(() => {
    delete global.SpeechRecognition
    delete global.webkitSpeechRecognition
  })

  describe('Soporte del navegador', () => {
    it('debe detectar si el navegador soporta SpeechRecognition', () => {
      const {result} = renderHook(() => useSpeechRecognition())

      expect(result.current.isSupported).toBe(true)
    })

    it('debe marcar como no soportado si no existe la API', () => {
      delete global.SpeechRecognition

      const {result} = renderHook(() => useSpeechRecognition())

      expect(result.current.isSupported).toBe(false)
    })

    it('debe soportar webkitSpeechRecognition', () => {
      delete global.SpeechRecognition
      global.webkitSpeechRecognition = mockSpeechRecognition

      const {result} = renderHook(() => useSpeechRecognition())

      expect(result.current.isSupported).toBe(true)
    })
  })

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const {result} = renderHook(() => useSpeechRecognition())

      expect(result.current.isListening).toBe(false)
      expect(result.current.transcript).toBe('')
      expect(result.current.error).toBe(null)
    })

    it('debe exponer funciones de control', () => {
      const {result} = renderHook(() => useSpeechRecognition())

      expect(typeof result.current.startListening).toBe('function')
      expect(typeof result.current.stopListening).toBe('function')
      expect(typeof result.current.resetTranscript).toBe('function')
    })
  })

  describe('startListening', () => {
    it('debe iniciar el reconocimiento', () => {
      const mockStart = vi.fn()
      mockSpeechRecognition.mockImplementation(() => ({
        start: mockStart,
        stop: vi.fn(),
        lang: '',
        interimResults: false,
        maxAlternatives: 1,
        continuous: false,
        onresult: null,
        onerror: null,
        onend: null,
      }))

      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.startListening()
      })

      expect(mockStart).toHaveBeenCalled()
      expect(result.current.isListening).toBe(true)
    })

    it('debe limpiar transcript al iniciar', () => {
      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.startListening()
      })

      expect(result.current.transcript).toBe('')
      expect(result.current.error).toBe(null)
    })

    it('debe manejar error si no está soportado', () => {
      delete global.SpeechRecognition

      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.startListening()
      })

      expect(result.current.error).toContain('no está soportado')
      expect(result.current.isListening).toBe(false)
    })

    it('debe manejar errores al iniciar', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const mockStart = vi.fn().mockImplementation(() => {
        throw new Error('Start error')
      })

      mockSpeechRecognition.mockImplementation(() => ({
        start: mockStart,
        stop: vi.fn(),
        lang: '',
        interimResults: false,
        maxAlternatives: 1,
        continuous: false,
      }))

      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.startListening()
      })

      expect(result.current.error).toBe('Error al iniciar el reconocimiento')

      consoleSpy.mockRestore()
    })
  })

  describe('stopListening', () => {
    it('debe detener el reconocimiento', () => {
      const mockStop = vi.fn()
      const mockStart = vi.fn()

      mockSpeechRecognition.mockImplementation(() => ({
        start: mockStart,
        stop: mockStop,
        lang: '',
        interimResults: false,
        maxAlternatives: 1,
        continuous: false,
      }))

      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.startListening()
      })

      expect(result.current.isListening).toBe(true)

      act(() => {
        result.current.stopListening()
      })

      expect(mockStop).toHaveBeenCalled()
      expect(result.current.isListening).toBe(false)
    })

    it('no debe hacer nada si no está escuchando', () => {
      const mockStop = vi.fn()

      mockSpeechRecognition.mockImplementation(() => ({
        start: vi.fn(),
        stop: mockStop,
        lang: '',
        interimResults: false,
        maxAlternatives: 1,
        continuous: false,
      }))

      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.stopListening()
      })

      expect(mockStop).not.toHaveBeenCalled()
    })
  })

  describe('resetTranscript', () => {
    it('debe limpiar transcript y error', () => {
      const {result} = renderHook(() => useSpeechRecognition())

      act(() => {
        result.current.resetTranscript()
      })

      expect(result.current.transcript).toBe('')
      expect(result.current.error).toBe(null)
    })
  })
})
