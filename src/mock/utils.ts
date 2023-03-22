import { InternalHttpCode } from '@/constants'

export class MockAdapterResponse<T> {
  constructor(public code: InternalHttpCode, public data: T) {}
}

export class MockAdapterSuccessResponse<T> extends MockAdapterResponse<T> {
  constructor(data: T) {
    super(InternalHttpCode.SUCCESS, data)
  }
}
