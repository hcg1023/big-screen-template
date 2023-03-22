import axios, { AxiosRequestConfig } from 'axios'
import type { AxiosInstance } from 'axios'
import { useServiceRequestInterceptors } from '@/utils/service/interceptors/request'
import { useServiceResponseInterceptors } from '@/utils/service/interceptors/response'
import { BASE_API } from '@/config'
import { InternalHttpCode } from '@/constants'

export interface IInternalAxiosConfig {
  /**
   * 是否自动弹出错误信息
   */
  useMessage?: boolean
  /**
   * 排除错误信息的InternalHttpCode
   */
  excludesMessage?: (InternalHttpCode | string)[]
}

export type IBaseServiceConfig<IgnoreKeys extends keyof AxiosRequestConfig> = Omit<
  AxiosRequestConfig,
  IgnoreKeys
> &
  IInternalAxiosConfig

class BaseService {
  private _services: AxiosInstance
  constructor(baseURL: string) {
    const service: AxiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 30000,
    })

    useServiceRequestInterceptors(service)
    useServiceResponseInterceptors(service)

    // 仅在开发环境使用mock
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createMockAdapter = require('@/mock')
      createMockAdapter(service)
    }

    this._services = service
  }

  get<T, R = any>(url: string, params: T, config: IBaseServiceConfig<'params'> = {}): Promise<R> {
    return this._services.get(url, {
      params,
      ...config,
    })
  }

  post<T, R = any>(url: string, data: T, config: IBaseServiceConfig<'data'> = {}): Promise<R> {
    return this._services.post(url, data, config)
  }

  postParams<T, R = any>(
    url: string,
    params: T,
    config: IBaseServiceConfig<'params'> = {},
  ): Promise<R> {
    return this._services.post(url, null, {
      params,
      ...config,
    })
  }

  postForm<T, R = any>(url: string, data: T, config: IBaseServiceConfig<'data'> = {}): Promise<R> {
    return this._services.postForm(url, data, config)
  }
}

export default new BaseService(BASE_API)
