import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/token'

/* 请求拦截器 */
export function useServiceRequestInterceptors(service: AxiosInstance) {
  service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.token = token
    }
    return config
  })
}
