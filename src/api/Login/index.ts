import { service } from '@/utils'

export interface ILoginReq {
  username: string
  password: string
}

export interface ILoginRes {
  token: string
}

export function login(data: ILoginReq) {
  return service.postForm<ILoginReq, ILoginRes>('/login', data)
}
