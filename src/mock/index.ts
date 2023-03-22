import MockAdapter from 'axios-mock-adapter'
import type { AxiosInstance } from 'axios'
import { mockLoginAdapter } from '@/mock/Login'

export function createMockAdapter(service: AxiosInstance) {
  const mock = new MockAdapter(service)

  mockLoginAdapter(mock)

  return mock
}
