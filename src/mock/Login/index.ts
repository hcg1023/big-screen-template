import type MockAdapter from 'axios-mock-adapter'
import { MockAdapterSuccessResponse } from '@/mock/utils'
import { ILoginRes } from '@/api/Login'

export function mockLoginAdapter(mockAdapter: MockAdapter) {
  mockAdapter.onPost('/login').reply(
    401,
    new MockAdapterSuccessResponse<ILoginRes>({
      token: '123456',
    }),
  )
}
