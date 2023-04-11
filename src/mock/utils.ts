import { BusinessHttpCode } from '@/constants'

export class MockAdapterResponse<T> {
  constructor(public code: BusinessHttpCode, public data: T) {}
}

export class MockAdapterSuccessResponse<T> extends MockAdapterResponse<T> {
  constructor(data: T) {
    super(BusinessHttpCode.SUCCESS, data)
  }
}
