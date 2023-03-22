import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import { HttpStatusCode } from 'axios'
import { EMPTY_OBJECT, InternalHttpCode } from '@/constants'
import { IInternalAxiosConfig } from '@/utils/service'

type InternalAxiosResponse = Omit<AxiosResponse, 'config'> & {
  config: InternalAxiosRequestConfig & IInternalAxiosConfig
}

function redirectToLogin() {
  if (router.currentRoute.name !== 'login') {
    router.replace('/login')
  }
}

/* 响应拦截器 */
export function useServiceResponseInterceptors(service: AxiosInstance) {
  service.interceptors.response.use(
    (response: InternalAxiosResponse) => {
      const { config, data: resData } = response
      const { useMessage = true, excludesMessage = [] } = config
      const { code, message, data } = resData
      // 根据自定义错误码判断请求是否成功
      if (code === InternalHttpCode.SUCCESS) {
        // 将组件用的数据返回
        return data
      } else {
        switch (code) {
          case InternalHttpCode.AuthExpired:
            break
        }
        if (useMessage && !excludesMessage.includes(code)) {
          // 处理业务错误。
          Message.error(message)
        }
        return Promise.reject(new Error(message))
      }
    },
    (error: AxiosError) => {
      const { config, status } = error.response || EMPTY_OBJECT
      const { useMessage = true, excludesMessage = [] } = config || EMPTY_OBJECT

      // 处理 HTTP 网络错误
      let message = ''
      switch (status) {
        case HttpStatusCode.Unauthorized:
          message = '登录已失效，请重新登录'
          redirectToLogin()
          // 这里可以触发退出的 action
          break
        case HttpStatusCode.Forbidden:
          message = '拒绝访问'
          redirectToLogin()
          break
        case HttpStatusCode.NotFound:
          message = '请求地址错误'
          break
        case HttpStatusCode.InternalServerError:
        case HttpStatusCode.NotImplemented:
        case HttpStatusCode.BadGateway:
        case HttpStatusCode.ServiceUnavailable:
        case HttpStatusCode.GatewayTimeout:
          message = '服务器故障'
          break
        default:
          message = '网络连接故障'
      }
      if (useMessage) {
        // 处理业务错误。
        Message.error(message)
      }
      return Promise.reject(error)
    },
  )
}
