import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'
import {afterEach, vi} from 'vitest'

afterEach(() => {
  cleanup()
})

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
}
