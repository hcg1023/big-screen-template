import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

/* 请求拦截器 */
export function useServiceRequestInterceptors(service: AxiosInstance) {
  service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    //  伪代码
    // if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  })
}
