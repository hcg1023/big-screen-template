import axios, { AxiosRequestConfig } from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { useServiceRequestInterceptors } from '@/utils/service/interceptors/request'
import { useServiceResponseInterceptors } from '@/utils/service/interceptors/response'
import { BASE_API } from '@/config'
import { BusinessHttpCode } from '@/constants'

export interface IInternalAxiosConfig {
  /**
   * 是否自动弹出错误信息
   */
  useMessage?: boolean
  /**
   * 排除错误信息的InternalHttpCode
   */
  excludesMessage?: (BusinessHttpCode | string)[]
}

export type IBaseServiceConfig<IgnoreKeys extends keyof AxiosRequestConfig> = Omit<
  AxiosRequestConfig,
  IgnoreKeys
> &
  IInternalAxiosConfig

type IDownloadFileFunctor = (filename?: string) => void

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
      // const { createMockAdapter } = require('@/mock')
      // createMockAdapter(service)
    }

    this._services = service
  }

  get<T = any, R = any>(
    url: string,
    params?: T,
    config: IBaseServiceConfig<'params'> = {},
  ): Promise<R> {
    return this._services.get(url, {
      params,
      ...config,
    })
  }

  post<T = any, R = any>(
    url: string,
    data?: T,
    config: IBaseServiceConfig<'data'> = {},
  ): Promise<R> {
    return this._services.post(url, data, config)
  }

  postParams<T = any, R = any>(
    url: string,
    params?: T,
    config: IBaseServiceConfig<'params'> = {},
  ): Promise<R> {
    return this._services.post(url, null, {
      params,
      ...config,
    })
  }

  postForm<T = any, R = any>(
    url: string,
    data?: T,
    config: IBaseServiceConfig<'data'> = {},
  ): Promise<R> {
    return this._services.postForm(url, data, config)
  }

  postExport<T = any, R = any>(
    url: string,
    data?: T,
    config: IBaseServiceConfig<'data'> = {},
  ): Promise<IDownloadFileFunctor> {
    return this.post(url, data, {
      responseType: 'blob',
      ...config,
    }).then(this.createDownloadFileFunctor)
  }

  private createDownloadFileFunctor(response: AxiosResponse): IDownloadFileFunctor {
    const { data, headers } = response
    const disposition = headers['Content-Disposition'] || headers['content-disposition'] || ''
    const dispositionMatch = disposition.match(/filename=(.*)/)
    let resolveFileName = ''
    if (dispositionMatch) {
      resolveFileName = decodeURIComponent(dispositionMatch[1])
    }
    return (filename?: string) => {
      if (filename) {
        resolveFileName = filename
      }
      // create file link in browser's memory
      const href = URL.createObjectURL(data)

      // create "a" HTML element with href to file & click
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', resolveFileName) //or any other extension
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    }
  }
}

export const service = new BaseService(BASE_API)
